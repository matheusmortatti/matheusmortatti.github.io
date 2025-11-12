---
title: "Weekly Report #2 — Responsibilities"
date: 2018-01-14
description: "Balancing new responsibilities with creative PICO-8 projects"
tags: ["Archive", "Weekly Report"]
archived: true
---

A lot happened this week. I made a little fire doodle and a dynamic split screen thing on the pico-8, but more importantly (for me at least) was the start of a new summer internship in a city very far away from home. It was also the restart of my research project back at the university, and the time to write about all the things I've done and created on it. This was a week of responsibilities.

## Firey

At the beginning of the week I remembered about a technique I saw a few months ago about how to make a fire effect. It was simple enough that I could make it in an hour or so with pico-8, so I did!

![Fire Thingy](/images/blog/weekly-report-2/fire-effect.gif)

**Fire Thingy**

It works by using a lot of moving circles as masks for the fire to create movement. You can spawn circles from either sides of the fire and make them move up and towards the middle, with a few random offsets. If you look closely, you can easily see the circles on the gif above

![Behind the Scenes](/images/blog/weekly-report-2/fire-behind-scenes.gif)

**Behind the Scenes**

After making that I …. added eyes to it

![Because Why Not?](/images/blog/weekly-report-2/fire-with-eyes.gif)

**Because Why Not?**

## Dynamic Split Screen

After that, I had to stop for a while to work on the research thingy for a while. I have I big deadline to meet, so that was a priority.

However, I was really craving for some pico-8 action. I was thinking about how I could do a dynamic split screen on it (like the ones in the LEGO games, when you play co-op!) and on the way back from work I doodled some ideas and algorithms to make it work. During Saturday and Sunday I actually started implementing it, finally! And this is the result:

![Multiplayer Fun!](/images/blog/weekly-report-2/split-screen-multiplayer.gif)

**Multiplayer Fun!**

The idea is to mess around with pico-8's simulated RAM. We have access to screen memory and we also have close to 7k bytes of user memory that we can use. What I though was that I could render Player 1 to the screen and then copy it's screen data to the user memory, render Player 2 and then copy half of P1's pixels back to the screen.

It got more complicated than that, tho. The screen takes 8k bytes of memory and we only have 7k bytes of user memory. What I had to do was to copy only what I needed from P1's screen to user memory, which is about half of the screen, and then copy it all back to where it belongs.

There is still a problem with the implementation. If you look closely to the line you can see that each screen isn't exactly aligned with that line. That's because pico-8 stores 2 pixels in one single byte and I ignore this fact right now. The result is that there are times where 1 pixel is off because I shouldn't have copied it back to the screen. On top of that, there are a few rounding problems too that accentuates this effect.

I mean to release it sometime, when I have the time and patience to clean up the code. But until then, you can hit me up on [twitter](http://twitter.com/matheusMortatti) and ask me what you want there!

## Responsibilities

All of this so far was cool and all, but we all need to deal with obligations, right ? I had a lot of those this week. I was getting to know my new team on the job and trying to catch up on all of the new things that were happening to me, and that was very tiring. Anxiety made me company this week, I had to deal with it a lot when thinking about failure and social situations that I'm not very good at. But I made it through! It turns out that my team is pretty cool, my mentor helps me a lot and I have my girlfriend to keep me company during my times alone in this hotel.

My research project was giving me a little headache too. Things are going wrong in the process and I am trying very hard to not get unmotivated with it, but it's hard. Failure is a part of research, so it's actually teaching me a lot about it, but it doesn't make it easier when it happens. I hope I can work it out and get things moving again, we've been stuck for a while now.

Thanks for listening,
Matheus Mortatti.
