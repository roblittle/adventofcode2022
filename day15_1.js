const fs = require('fs');
var args = process.argv.slice(2);
let input = fs.readFileSync(args[0]).toString()
    .trim()
    .split("\n")
    .map((line) => {
        let split = line.split(" ");
        let sensorX = parseInt(split[2].substring(2).slice(0, -1));
        let sensorY = parseInt(split[3].substring(2).slice(0, -1));

        let beaconX = parseInt(split[8].substring(2).slice(0, -1));
        let beaconY = parseInt(split[9].substring(2));

    return [
        { x: sensorX, y: sensorY },
        { x: beaconX, y: beaconY },
    ];
});

console.time("ExecutionTime");

const Y_LEVEL = 2000000;

// wiki/googled this
const manhattanDistance = (a, b) => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

let impossiblePositions = new Set();
let specialPositions = new Set();

// setup special places as either S/B 
for (let [sensor, beacon] of input) {
  specialPositions.add(`${beacon.x},${beacon.y}`);
  specialPositions.add(`${sensor.x},${sensor.y}`);
}

// now parse the special places against all input.
for (let [sensor, beacon] of input) {
  let distance = manhattanDistance(sensor, beacon) + 1;

  let yDiff = Math.abs(Y_LEVEL - sensor.y);

  for (let x = 0; x <= distance - yDiff - 1; x++) {
    if (!specialPositions.has(`${sensor.x + x},${Y_LEVEL}`))
      impossiblePositions.add(`${sensor.x + x},${Y_LEVEL}`);
    if (!specialPositions.has(`${sensor.x - x},${Y_LEVEL}`))
      impossiblePositions.add(`${sensor.x - x},${Y_LEVEL}`);
  }
}

console.log(impossiblePositions.size);

console.timeEnd("ExecutionTime");