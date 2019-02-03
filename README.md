# mazeSolver

## Scripts:

- npm start [DIR] - DIR is optional, if you dont add a directory, the script will solve the mazes inside the `mazes` folder

This script uses A\* Algorithm to solve the mazes with Manhattan heuristic to know the difficulty to the end of every node.

## Mazes structure:

- '\_' (underscore) character is an obstacle a.k.a. `wall`
- 'I' is the start of the maze
- '[1-9]' traps that add difficulty to the goal
- 'E' is the exit of the maze (our goal)
