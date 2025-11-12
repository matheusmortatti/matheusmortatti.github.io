---
title: "Weekly Report #4 — Motivation"
date: 2018-02-04
description: "Dealing with motivation slumps and getting back on track with Unity development"
tags: ["Archive", "Weekly Report"]
archived: true
---

Last week I didn't make a WR. After finishing my last project, I couldn't find anything that got my wheels turning again, so I went into slow mode. I was unmotivated.

Keeping a good production momentum is hard, even harder when you break your streak and have no idea what to do next. Those who follow me on [Twitter](http://twitter.com/MatheusMortatti) might have already realized that I post a lot of work in a row and then go silent for a week or two. This is the period when I'm at a low and probably distancing myself from others and that's not healthy at all. I've been trying my best to get up and do anything to find the motivation that keeps slipping from my hands all the time.

Kind of depressing, huh ? It really is, but right now I think I got myself back up again! My productivity isn't that great, but slowly I can build up my pace and focus to keep on going. This is what I worked on this week.

## Unity and It's Quirks

While I was trying to dig out something that I actually wanted to create, I remembered that every time I enter game jams or start a new project I need to write the same code over and over again, and it usually is platforming code. So, to change that, I fired up Unity and decided to create a Platformer Engine from scratch, and since I've just used Game Maker and Pico-8 to do that, it would be a challenge! Learning Unity was something that I said that I would do time and time again.

But the first question everyone asks themselves when starting another 2D Unity project is: should I use the built in physics or create my own ? Since my games wouldn't have believable physics, maybe not using it is a better choice. That means creating my own collision system and physics! So that's what I'm doing.

After about 2 or 3 days messing around with the engine, here's what I got:

![Slopes!](/images/blog/weekly-report-4/unity-slopes.gif)

**Slopes!**

## The Approach

As you can see in the image, I'm casting some rays to check for objects around the body. Without slopes, the algorithm is quite simple:

```csharp
// Horizontal Direction
Vector2 startpoint = new Vector2(boxCollider.center.x, boxCollider.yMin);

Vector2 endpoint = new Vector2(boxCollider.center.x, boxCollider.yMax);

float distance = boxCollider.width / 2 + Mathf.Abs(_velocity.x) + margin;

dir = new Vector2(_direction.x, 0);

// Function that casts rays from start to end point to a direction,
// with a distance and a number of rays. Returns if it hit something
// or not!
if (CastRays(out hitInfo, startpoint, endpoint, dir, distance, horizontalRays))
{
    // translate to the point of the collision and set velocity to zero so it won't go through it
    transform.Translate(dir * (hitInfo.distance - boxCollider.width / 2 - margin));
    _velocity = new Vector2(0, _velocity.y);
}
```

The idea is to, for both horizontal and vertical movement, cast rays from the middle of the body to the direction of the velocity with the length equals to the distance from the middle to the edge of the body, plus the velocity. This way we can tell if there will be a collision before the movement happens. If a collision is detected, move the body to the exact point where the collision would happen and set the velocity to zero.

For horizontal slopes, I did a check on the horizontal movement for whether or not the collision object was a slope terrain. If it is, I move the body inside the slope and cast vertical rays down to find the point on the surface of the slope where our object should be. Then I move it there! Let me illustrate:

![From left to right to bottom!](/images/blog/weekly-report-4/slope-illustration.png)

**From left to right to bottom!**

Quite simple, I can just cast some rays from the top of the body to check for the point in the slope that I need to move it to!

## Conclusion

Even though this was a short one, I'm happy to get back on track with these weekly reports. It keeps me going and makes me come up with stuff to show people! As always, you can hit me up on [Twitter](http://twitter.com/MatheusMortatti) with a DM or a message and I'll gladly discuss the code with you!

Thanks for listening,
Matheus Mortatti.
