# Shay's game engine
Just a place to experiment with some ideas related to making videogames while simultaneously testing my current programming proficiency.

This is custom software that I'm writing from the ground up without consulting any specific framework, or tutorial. I'm literally building this with intuition and from my own personal experience actually playing videogames over the years.

As such, this is no doubt going to be flawed. Still, it is a good self test, and heck it's fun!
Quick ideas and tests are built here: https://codepen.io/p3z-the-vuer/pens/public, some of these make their way into the final codebase, others don't


## Objectives
Upon completion, use the engine to create a game in each of these genres.
- vertical scrollers
- side scrollers
- tilemap / sprite based games
- first-person perspective
- third-person perspective

## Thinking out loud (a coder's log)
03/11/23
- Using DOM elements isn't going to scale. Performance is already taking a hit with imposed limits. Switch to making use of the canvas API via a library