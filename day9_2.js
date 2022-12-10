// read input
const fs = require('fs');
let args = process.argv.slice(2);
let inputArray = fs.readFileSync(args[0]).toString().split("\n");

let visited = new Set();
let knotCount = 10;
let rope = new Array(knotCount).fill(0).map(() => ({ x: 0, y: 0 }));


inputArray.forEach((move) => {
    let [direction, distance] = move.split(" ");
  
    distance = parseInt(distance);
  
    for (let i = 0; i < distance; i++) {
      moveHead(direction);
  
      /** updating each knot of the rope looking at the knot just infront of it  */
      /** Knot is 0 index considered as HEAD */
      for (let j = 1; j < rope.length; j++) {
        if (!isTouching(rope[j - 1], rope[j])) {
          rope[j] = moveKnot(rope[j - 1], rope[j]);
        }
      }
  
      visited.add(`${rope[knotCount - 1].x},${rope[knotCount - 1].y}`);
    }
  });

  console.log("visited >> ", visited.size);

/** Helper functions */

// we are only touching verticle, horizontal, or diag, IF difference is 1 or less
function isTouching(knot1, knot2) {
  let dx = Math.abs(knot1.x - knot2.x);
  let dy = Math.abs(knot1.y - knot2.y);

  return dx <= 1 && dy <= 1;
}

// simple mover for U/D/L/R
function moveHead(direction) {
  switch (direction) {
    case "R":
      rope[0].x++;
      break;

    case "U":
      rope[0].y++;
      break;

    case "L":
      rope[0].x--;
      break;
    case "D":
      rope[0].y--;
      break;
  }
}

// find the deltas, and move the knots accordingly 
function moveKnot(knot1, knot2) {
  let newCoords = { ...knot2 };
  let dx = knot2.x - knot1.x;
  let dy = knot2.y - knot1.y;

  if (dx > 0) newCoords.x--;
  else if (dx < 0) newCoords.x++;
  if (dy > 0) newCoords.y--;
  else if (dy < 0) newCoords.y++;

  return newCoords;
}
  