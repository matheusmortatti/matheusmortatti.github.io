---
title: "3D Rendering in PICO-8"
date: 2017-12-11
description: "Building a 3D rendering engine in PICO-8 from scratch, covering vertex transformations, projections, and lighting"
tags: ["Archive"]
archived: true
---

## Introduction

Computer Graphics has always been a hard topic for me. Every time I read about it, I got more and more confused. It's a hard concept to grasp and the sheer amount of different names for the same thing (and names that doesn't make any sense) just drove me crazy. However, ever since I got PICO-8 I wanted to make a 3D renderer on it without any kind of abstractions, with an easy API to draw things on the screen. This is what the finished product looks like!

[**Pico Engine by MatheusMortatti**](https://matheusmortatti.itch.io/pico-engine)

![3D Engine Demo](/images/blog/3d-rendering-pico-8/demo.gif)

So, about two months ago I got an example PICO-8 cart that I found in a PICOZINE (which are great!). It covered the basics of perspective rendering of a wireframe cube on the screen:

![Wireframe Cube](/images/blog/3d-rendering-pico-8/wireframe-cube.gif)

It was enough for me to understand how I could transform a 3D shape in 2D screen coordinates and how to rotate a point around the origin. However, it didn't do any more than that because it was missing a lot of the formal steps of 3D rendering (and that was the whole point, to be a simple solution for a complex problem).

So that's when my quest of understanding the 3D rendering pipeline began! And now I will try to explain to you all the concepts I learned (and the maths that came with it) as well as where I failed in the process. I focused my efforts on rendering triangles, but most of the process can be applied to other kinds of shapes (you'll need to change the way you draw your shape on the screen, basically).

## Vertex Transformations

To transform a bunch of triangle vertexes in screen coordinates, we follow this transformation pipeline:

![Vertex Transformation Pipeline](/images/blog/3d-rendering-pico-8/vertex-pipeline.png)

1. Create a 3D shape (i.e. a collection of triangles). It's points in space should be declared in the shape's coordinate system, the Object Space (point (0,0,0) might be in the middle of the shape, for example).
2. Translate and rotate the shape to your world's coordinate system (World Space).
3. Translate and rotate the shape to the Camera Space. Basically the camera is now your origin point (0,0,0) and it's pointing to the -Z axis (by convention) and all other shapes needs to be moved to this coordinate system so you know where they are related to the camera. With this step you know what should and should not be rendered, like objects that are behind the camera (i.e. they are somewhere in the positive Z axis).
4. Project the 3D points from the last step to 2D points on the screen coordinate system. If you see the image above, we have the Homogeneous Clip Space, which is a way to represent all the points from your scene where the range [-1,1] for *x* and y is what can be seen by the camera. Then, we transform this range in the actual resolution size, so you'll have `0 <= x < ResolutionX` and `0 <= y < ResolutionY`.
5. Fill the triangle using a Rasterization technique.

These are the steps I needed to learn in order to get a bunch of 3D points and transform them in points on the PICO-8 screen. I'm going to break it down in a few steps and try to connect them all!

## The Shape

This is pretty straightforward, I just created a structure in the code to keep a bunch of triangles and their colors. It goes like this: the shape holds a collection of triangles and a triangle holds 3 vertexes and a color. Each vertex has the coordinates x, y and z. Here is an example:

![Square Structure](/images/blog/3d-rendering-pico-8/square-structure.png)

**This is a simple square defined in the structure I described!**

One thing to keep in mind is to always declare each triangle in clock-wise order as if you are staring directly to it. This means that if you want the square facing the other way, you need to declare the points in reverse order. Declaring triangle vertexes like this will make it easier to calculate the triangle's normal, for later purposes.

## From Object to World Space

After I declared my shapes, is time to apply a transformation from Object Space to World Space. This is quite simple, I just added to all the vertexes of each shape the point in which I want it to be, and then rotated each point the way I wanted. The following link will direct you to where I found the calculations for point rotation!

[**3D Rotation**](https://www.siggraph.org/education/materials/HyperGraph/modeling/mod_tran/3drota.htm)

One thing that this source doesn't provide is how to rotate a point around another point ***c*** that is not the origin. To do that, just subtract each coordinate by ***c***, apply the rotation, and then add it back.

## The Camera Space

This one was tricky for me. It took me a while to understand how to transform everything to camera space because there are multiple ways to do it. I ended up using the FPS camera method.

What we use to transform a point from World Space to Camera Space is what we call a View Matrix. This is a matrix that holds information about the cameras orientation (where it's facing) and position. It's defined using **Yaw** and **Pitch** values (rotation around the Y axis and the X axis, respectively) and the **Eye** point (where the camera is). The process is very simple in theory: translate everything to a new origin (the camera position) and then rotate everything around it based on the camera's orientation, this is what this matrix does. However, now we need to get into some maths.

```
x = {cos(Pitch), 0, -sin(Pitch)}
y = {sin(Yaw)*sin(Pitch), cos(Pitch), cos(Yaw)*sin(Pitch)}
z = {sin(Yaw)*cos(Pitch), -sin(Pitch), cos(Yaw)}

FPSViewMatrix[4][4] = {
    {x[1],y[1],z[1]}
    {x[2],y[2],z[2]}
    {x[3],y[3],z[3]}
    {-dot(x, eye), -dot(y, eye), -dot(z, eye)}
}
```

With this calculation of the View Matrix, we can multiply it by our point (x,y,z).

One thing that always confused me is how the hell am I going to multiply a 4x4 matrix by a 1x3 point ? What is the 4th value? The answer for this is 1. The forth value is called the ***w*** coordinate and what it means is still a mystery for me, but you want it to be 1 (maybe tell me what it means on [twitter](https://twitter.com/MatheusMortatti)?).

Keep in mind that this matrix was declared with the Row Major convention. This means that our point is a 1x3 (1x4 with the ***w*** coordinate) and we are going to multiply it by a 4x4 matrix, so we need to do it in the order ***V * M***, where V is our point and M is the matrix.

After this multiplication, we now have a translated and rotated point in Camera Space and we are now ready to project this point to the screen and draw things on the screen!

## Flatten Things Out

The last step in this process is to project the points we have in the Camera Space to our Window Space! To achieve this, we have a very simple formula that relates our x, y and z to get the screen x and y:

```
Screen X = - (resX/2) * (x / z) + (resX/2)
Screen Y = - (resY/2) * (y / z) + (resY/2)
```

What this equation means is that we are transforming (x,y,z) in a 2D coordinate (x,y) with the *projection* step in our pipeline by dividing x and y by -z, then applying the Viewport Transformation by multiplying this value by each resolution size divided by two, resulting in the visible points being in the range `[-resX/2, resX/2]` and `[-resY/2, resY/2]`. Finally, we correct the values to make them in the range `[0, resX]` and `[0, resY]`.

The minus sign is there because our convention is to have all the visible points from the camera in the negative Z axis. In PICO-8's case, `resX` and `resY` are both equal to 127, because the pixel coordinates goes from 0 to 127.

Actually, this is a very simplified version of the actual step. If we had a different aspect ratio than 1:1 and a changing Field of View we would have to change these calculations a bit.

## A Few Other Steps

Now that we have our pipeline to transform a 3D point all the way from Object Space to our Screen Coordinates, we just need a few more things to have a filled triangle drawn on the screen! I will now talk about triangle rasterization and light calculation on PICO-8.

## Fill It Up!

This is where we fill a triangle with color. I did *in a Scanline* way, where I filled the triangle by drawing lines bottom up.

![My First Rasterized Triangle!](/images/blog/3d-rendering-pico-8/first-triangle.jpeg)

**My First Rasterized Triangle!**

The idea is to, firstly, break down the triangle into two triangles with a flat base. Then, for each triangle, I loop through it line by line starting at the flat base, updating the start and end of the line based on the angle of each side of the triangle.

![Triangle split into two](/images/blog/3d-rendering-pico-8/triangle-split.png)

**Triangle split into two**

Bellow you'll find the link where I got the algorithm for triangle filling, as well as how to actually split the triangle in two flat base ones. If you have any questions about how it works, just hit me up on Twitter!

[**Software Rasterization Algorithms for filling triangles**](http://www.sunshine2k.de/coding/java/TriangleRasterization/TriangleRasterization.html)

## Light It Up!

Now it's time to apply some lights to our scene. I did it the simple way, which is just to calculate the angle between each triangle's normal and the vector representing the light's direction. This makes a *Directional Light*, which is used to create global illumination to your scene, such as a Sun. It doesn't use anything but the orientation of the triangle in relation to the light to calculate the new color of your triangle. Of course, this is a huge simplification of it, it's much more complex in a more robust 3D Engine.

In PICO-8, you need rely on palette swapping in order to emulate light. This is done by creating a palette table that holds, for a given color, all of it's values depending on the light level you want. Let me show you what I mean.

![Palette declaration](/images/blog/3d-rendering-pico-8/palette-declaration.png)

**Palette declaration**

The picture above is an example of light levels for each of PICO-8's colors. As you can see, each column is a light level and the first column holds the original colors. This specific light palette I got from the following article written by Jakub Wasilewski. On it, he explains how he made an insane real time lighting in PICO-8 in 4 parts and in the first one he goes in detail about light palettes, you should read it to learn more about it :).

[**PICO-8 lighting, part 1: thin dark line**](https://hackernoon.com/pico-8-lighting-part-1-thin-dark-line-8ea15d21fed7)

With the colors sorted out, what I needed to do was calculate the angle between the light vector and the triangle's normal and change this value to make it go from 1 to the size of my palette.

As you can see, this function receives a triangle and a vector representing the direction of the light. First, I calculate the triangle's normal by creating two vectors from its sides.

![Triangle Normal Vectors](/images/blog/3d-rendering-pico-8/triangle-normal.png)

With vectors *v* and *u*, now we can calculate the cross product between them to get the normal we wanted and then normalize it.

In the code I reverse the direction of the light to calculate the angle's cosine. That's because if the normal and the light are facing the same direction, it actually means that the triangle has it's back facing the light and we want the triangle to be dark, and in that case I wanted the cosine to be -1. Now, to calculate the cosine of the angle between two vectors, we do the following:

```
cos(angle) = ( a . b ) / ( |a|*|b| )
```

That is, the cosine of the angle is the dot product between the two vectors divided by the multiplication of their lengths. With this value, we just need to change it's range from (-1,1) to (1, Size of Palette) and then we are done! I just added 1 to the value and divided that by 2, to get a (0,1) range. The line `angle = abs(angle)` is just a safety measure because in Lua you can have a -0 value and that screws things up.

## Conclusion

There are A LOT of steps I haven't covered neither here nor in my engine. I skipped a few formalities so I could get this done and have something to show people. If you want to make your own 3D engine in PICO-8, be sure to look for more sources so you learn more about the process on the way like me!

Doing this engine has been quite a ride. I confronted a lot of bugs and some made me quit the project for over a month. However, I am quite happy with the finished product, even though it is quite simple and could use some improvements. I will probably be posting more things like this on my [Twitter](http://twitter.com/MatheusMortatti), so be sure to follow me there!

Thanks for listening,
[Matheus Mortatti](http://twitter.com/MatheusMortatti).
