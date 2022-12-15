const fs = require('fs');
let args = process.argv.slice(2);

// kudos to https://github.com/mariom100o/Advent-of-Code-Solutions/blob/main/2022/day14/part1.js 
// as this was a *terrific* learning opportunity for me / probably wouldn't have solved 
// without complete brute-force-fuckery and no where near this elegant

// setup lines
const lines = fs
  .readFileSync(args[0])
  .toString()
  .trim()
  .split("\n")
  .map((line) => {
    let split = line.split(" -> ");
    let points = split.map((point) => {
      let [x, y] = point.split(",");
      return { x: parseInt(x), y: parseInt(y) };
    });
    return points;
  });

// Determine the size of the sandMap
let minX = Infinity;
let maxX = 0;
let maxY = 0;
for (let line of lines) {
  for (let point of line) {
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
    minX = Math.min(minX, point.x);
  }
}

let sandMap = new Array(maxY + 1)
  .fill(0)
  .map(() => new Array(maxX - minX + 1).fill(0));

// Fill the sandMap with the points
for (let line of lines) {
  let prevPoint = line[0];
  for (let i = 1; i < line.length; i++) {
    let point = line[i];

    if (point.x === prevPoint.x) {
      let start = Math.min(prevPoint.y, point.y);
      let end = Math.max(prevPoint.y, point.y);
      for (let y = start; y <= end; y++) sandMap[y][point.x - minX] = 1;
    } else {
      let start = Math.min(prevPoint.x, point.x);
      let end = Math.max(prevPoint.x, point.x);
      for (let x = start; x <= end; x++) sandMap[point.y][x - minX] = 1;
    }

    prevPoint = point;
  }
}

console.time("ExecutionTime");

const sandMapLength = sandMap[0].length;

// Extend the sandMap to the left and right
sandMap = sandMap.map((line) => {
  let bufferLeft = new Array(line.length * 4).fill(0);
  let bufferRight = new Array(line.length * 4).fill(0);

  return bufferLeft.concat(line).concat(bufferRight);
});

// Extend the sandMap to the bottom and add a floor
let bufferAir = new Array(sandMap[0].length).fill(0);
let bufferFloor = new Array(sandMap[0].length).fill(1);
sandMap.push(bufferAir, bufferFloor);

const SAND_START = 500 - minX + sandMapLength * 4;
let notFull = true;
let landedSand = 0;

while (notFull) {
  let sandPos = { x: SAND_START, y: 0 };

  // While the sand has a place to fall, keep falling;
  let downOpen = sandMap[sandPos.y + 1][sandPos.x] === 0;
  let downLeftOpen = sandMap[sandPos.y + 1][sandPos.x - 1] === 0;
  let downRightOpen = sandMap[sandPos.y + 1][sandPos.x + 1] === 0;

  // If nothing is open, we've filled up the map
  if (!downOpen && !downLeftOpen && !downRightOpen) {
    landedSand++;
    notFull = false;
    break;
  }

  while (downOpen || downLeftOpen || downRightOpen) {
    if (downOpen) {
      sandPos.y++;
    } else if (downLeftOpen) {
      sandPos.x--;
      sandPos.y++;
    } else if (downRightOpen) {
      sandPos.x++;
      sandPos.y++;
    }

    downOpen = sandMap[sandPos.y + 1][sandPos.x] === 0;
    downLeftOpen = sandMap[sandPos.y + 1][sandPos.x - 1] === 0;
    downRightOpen = sandMap[sandPos.y + 1][sandPos.x + 1] === 0;
  }
  sandMap[sandPos.y][sandPos.x] = 1;
  landedSand++;
}

console.log(landedSand);

console.timeEnd("ExecutionTime");