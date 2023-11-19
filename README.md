# Play_Construct -> a rudimentary game engine
This project is just a place to experiment with ideas related to making videogames while simultaneously testing my current programming proficiency.

This is custom software that I'm writing from the ground up without consulting any specific framework, or tutorial. I'm literally building this with intuition and from my own personal experience actually playing videogames over the years.

As such, this is no doubt going to be flawed. Still, it is a good self test, and heck it's fun!
Quick ideas and tests are built here: https://codepen.io/p3z-the-vuer/pens/public, some of these make their way into the final codebase, others don't


## Objectives
Upon completion, use the engine to create a different game with each of these mechanics. The engine will have a modular component for each isolated mechanic, so that we can granularly load selected components for a particular project
- vertical scrollers -> in progress
- side scrollers
- tilemap / sprite based games
- first-person perspective
- third-person perspective
- deck building / card games
- traditional games (think board games)
- point and click / node traversing
- Interactive puzzles (from simple to fast-paced, eg from sudoku to candycrush)
 
 ### Bonus objectives
 Investigate how one would go about crafting something more complex like these: 
- open world
- procedurally generated

## JS Map
- utils.js: generic functions that could be used anywhere
v2: 
    - settings: a place to store variables that don't typically change, used mostly for default and initialisation params.
    - animations: 
    - DOM_elements: a place to register everything in the DOM that is interactable
    - evt_handlers: a place to define event-based functionality
    - generators: a place to store functions that spawn game elements
    - state: a place to store state variables that change across the running of the program
    - main: custom p5 logic is specified here that may invoke functions from everywhere else


## Thinking out loud (a coder's log)
03/11/23
- Using DOM elements isn't going to scale. Performance is already taking a hit with imposed limits. Switch to making use of the canvas API via a library
04/11/23
- Decided on P5, replicated majority of existing functionality making use of this. (v1 is stored inside archive folder)