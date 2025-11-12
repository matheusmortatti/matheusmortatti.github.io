---
title: "Weekly Report #3 — Split 'em Up"
date: 2018-01-21
description: "Deep dive into implementing a dynamic split screen algorithm in PICO-8"
tags: ["Archive", "Weekly Report"]
archived: true
---

This week was entirely focused on that Dynamic Split Screen algorithm I was working on. That doesn't sound like much (and it isn't) but I had other things to do and after I finished the project, nothing really made me sit on the chair to work. I was out of ideas.

![The Finished Product!](/images/blog/weekly-report-3/split-screen-finished.gif)

**The Finished Product!**

However, I'll dedicate this report to go a little deeper on how the algorithm works. So grab a cup coffee, sit down and put on your programmer's hat!

## The Basic Idea

To render two different camera spaces to the screen, somehow you'll need to render the first camera space, copy the pixel values, render the second camera space and finally copy the sections of the first one back to the screen. That copying process is done by scan lines, since copying each pixel would destroy performance. In our case, we want to copy back only half of the screen bounded by the line that separates each player.

To define a line you need two points. We start by getting both player's positions and finding the angle of the line defined by them. Then, rotate the angle by 90 degrees to have the angle of the line we want. With a few calculations that I'll describe later, we know where to start and end the scan line we want to copy.

## The Memory Space

To manipulate values on the screen, we could just read each pixel on the screen using `pget(x,y)` and then set them back using `pset(x,y,v)`. That would be incredibly slow though, and impossible in a performance standpoint.

A better approach would be accessing pico-8's VRAM directly. The console has a very neat feature that allows you to access values on it's fantasy memory and manipulate them! We could now use `peek(mem)` and `poke(mem, val)` to change screen data, but that's still too slow, since we would need to read every single pixel.

We still have a few other options. There's another version of `peek/poke` called `peek4/poke4` where you read 4 bytes at the same time which would make things a lot faster. But we can still do one better!

Fortunately, there are roughly 7k bytes of data available to the user to use however he wants. Another approach would be using `memcpy` to copy data from screen memory to user memory, but the screen occupy 8k bytes and we don't have all of that. That's actually fine because we just need half of the screen to be copied into user memory! Instead of taking the whole screen to another place, we can just copy half of it and then copy it all back to where it belongs.

Pico-8 has one little quirk we need to take care off: each pixel on the screen occupies only half of a byte, so each byte has two pixels stored. That means if we want an odd number of pixels we need to make a few adjustments to the copying process to make it work.

```lua
function screenline_to_usermem(xt,line,off)
 xt=flr(xt)
 local x2=flr(xt/2)
 local new_off=off

 -- copy an even portion of memory
 memcpy(0x4300 + off,0x6000 + 64*line, x2)
 new_off+=x2

 -- if we have a leftover pixel, copy the whole byte
 -- to user memory
 if xt%2==1 then
  local p=peek(0x6000 + 64*line + x2)
  poke(0x4300 + off + x2,p)
  new_off+=1
 end

 return new_off
end
```

This function will take an x coordinate that'll specify where to end the line, which line you want to copy and an offset from the user memory, which will be the starting address where the data will be copied to. The function will return the new offset value after we copied the data so we can copy more things starting at this offset.

After copying the line, we need to check if xt is an odd number. If it is, it means that we need to copy another byte from the screen because we want to recover half of it when copying it back to the screen.

To copy back to the screen is pretty much the same, but we have to do some pixel manipulation if we want to get that single pixel back to the screen.

```lua
local ppair = peek(0x6000 + 64*line + x2)
local p=peek(0x4300 + off + x2)

ppair=band(ppair,0xf0)
p=band(p,0x0f)

poke(0x6000 + 64*line + x2,bor(p,ppair))
```

If we have the byte `1101 0010` representing a pixel, the four rightmost bits are actually our left pixel. Above you can see that we need to retrieve both the last byte on the screen and on the user memory and then apply a mask to them, writing zero values to all bits but the ones we need. Then, by using an `or` operation we can merge the pixel from user memory and the other from the screen.

## Line Calculation

The way I chose to define a line was the following:

```
a = (y2-y1)
b = (x1-x2)
c = a * (x — xm) + b * (y — ym)
```

Where `xm` and `ym` are the midpoint coordinates in relation to `(x1,y1), (x2,y2)`.

The typical way we learn in school is `y = a * x + b` where `a` is the tangent of the angle of the line. This is problematic when the line is at a 90 or 270 angle and the `tan(90) = -tan(270) = infinity`, so defining it this way won't do as any good.

Now we find where the line intersects with the borders of the screen and work our way down each line from there. For that, we need to break it into two separate cases, one for when the line intersects with the top and bottom of the screen and other when it intersects with the sides.

The first case is pretty straightforward. Just find the point where the line intersects the top and work your way down the slope, copying the lines. The second case is a little trickier because there are sections of the screen where you need to copy the whole line and this section might be on the top or bottom of the screen. So, repeat the same process from one end of the line to the other and then find whether you need to copy a top or bottom portion of the screen based on your player's position.

## Getting Back Together

To keep each player visible on it's respective side of the screen, I calculate a 32 pixel offset from the middle of the screen perpendicular to the line separating them. That way each player always stays visible and 32 pixels away from the line.

That little trick is used to make that smooth transition from one to two cameras, back to one. Since each player is 32 px away from the line, they are 64 pixels away from each other at all times. The simplest way to do this is to add a condition that if the two players are less than 64 px apart, we draw only one screen. And that's it! Looks more complicated that it is, I though I would never be able to achieve this transition actually.

## Conclusion

Well, I hope you got something out of this! Any questions you can shoot me a [DM on Twitter](http://twitter.com/MatheusMortatti) and I'll be happy to explain this through! Meanwhile, you can download the source code and play with it [right here!](https://matheusmortatti.itch.io/pico-8-dynamic-split-screen)

Thanks for listening,
Matheus Mortatti.
