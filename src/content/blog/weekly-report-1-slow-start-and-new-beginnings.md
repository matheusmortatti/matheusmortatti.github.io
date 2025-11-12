---
title: "Weekly Report #1 — Slow Start and New Beginnings"
date: 2018-01-07
description: "Starting weekly reports with Wave Function Collapse in PICO-8 and new beginnings"
tags: ["Archive", "Weekly Report"]
archived: true
---

## Wave Function Collapse by a Dummy

I started the year by creating a simple tile based WFC algorithm for PICO-8. I feel like there are few resources that actually explain the algorithm in depth properly, so I just got bits and pieces together from multiple sources and ended up with some sort of a frankenstein of a program.

It works though! Take a look on a few examples:

![Top-Down terrain Generation](/images/blog/weekly-report-1/wfc-topdown-terrain.gif)

**Top-Down terrain Generation**

![Side Scroller Generation](/images/blog/weekly-report-1/wfc-side-scroller.gif)

**Side Scroller Generation**

Keep in mind that these gifs are sped up 5x because my implementation is quite slow and there are a few tweaks I need to make before posting the source code!

## A Little Primer on WFC

I'll explain how the algorithm works in a very simple form.

It works by finding tile patterns you provide, looking through it and computing, for each kind of tile, all the possible tiles that can go around it.

In a tile based map, we start it off by assigning to each position an array of possible tiles that the position can be. At the beginning, all positions can be any kind of tile. Then, at the start of each iteration we choose a position and assign to it one of the possible tiles it could be. Now, knowing which tiles can go around the chosen tile, we reduce the possibilities of them (in all 8 directions surrounding it).

By repeating these steps, we create a map following a pattern given by the user. That's a very basic explanation of it and it's missing a lot of details, but I'll be writing a full article about it in the future, when I have the code ready to go.

What is keeping my code to run faster tho is the fact that, to get different chances for different kinds of tiles to be chosen, I keep duplicates of them. So, If I want tile #1 to have a 66% chance of showing up and tile #2 to have a 34% chance, I need to have two copies of tile #1 and one copy of tile #2. Because of that, when I need to iterate through the arrays, it takes too long because they are too big. I'll be changing that to a structure where I use a hash map where the key is the tile ID and the value is the number of times it shows up in the array. That way, I can choose a tile by doing the following:

1. Sum up all the values of all the entries on the hash map
2. Get a random value *R* from 0 to the sum
3. Imagine the first entry of the HM has a value of 3. So, if we have 0 ≤ R < 3, then we choose the first entry. If the second entry has a value of 4, we choose it if 3 ≤ R < 4. We repeat that for all the entries.

This will make going through the array faster, but it also means we have to go through the array every time we want to choose one to assign to a position. But since the number of tiles placed in the patter is probably greater then the number of types of tiles we have, that's okay.

## New Year, New Beginnings Right ? Or … something like that.

This year I got two internships in Computer Science (not in games, unfortunately). The first one is a summer internship in Porto Alegre, south of Brazil, working with Big Data. I'm here now, a couple of hundreds miles away from home.

This means that I'll be living in a hotel for two months and away from my family and my girlfriend. It might not seem much, but since I've never been away from home for so long, it feels new and scary for me. It's a huge opportunity from a learning perspective and from a life perspective. I'll be focusing this time on that and on more game development things that I'll come up with. I have a few ideas of what I want to do next.

I don't have a conclusion for this bit, only that I'll be experiencing new things and my anxiety is going to kick in a lot, but that's okay.

## Closing Up

This is the first of a lot of weekly reports. My plan for this year is to keep doing it to keep track of my personal progress throughout the year and actually measure how my year went!

I have a few goals for this year and I mean to achieve them, for once.

Thanks for listening,
Matheus Mortatti.
