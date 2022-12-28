const fs = require('fs');
var args = process.argv.slice(2);

let inputGraph = new Map();
function getInput() {
    let input = fs.readFileSync(args[0]).toString()
    .trim()
    .split("\n")
    .map((line) => {
        let split = line.split(" ");
        let valve = split[1];
        let flowRate = parseInt(split[4].substring(5, split[4].indexOf(";")));

        // grab array elements after split[8] and put them into array referencd by tunnels
        let otherValves = []
        for(let i = 9; i<split.length; i++){
            otherValves.push(split[i].substring(0,2))
        }

        inputGraph.set(valve, { 
            valve, 
            flowRate: flowRate, 
            neighbors: otherValves,
            open: false,
        });

    })
    return inputGraph;
}

// help from https://github.com/Chabloz/adventOfCode2022/blob/main/d16.js#L31 
function parseInput() {
    let input = fs.readFileSync(args[0]).toString();
    const graph = new Map();
    for (const line of input.split('\n')) {
      const rate = Number(line.match(/\d+/g)[0]);
      const [id, ...neighbors] = line.match(/[A-Z]{2}/g);
      graph.set(id, {id, rate, neighbors, open: false});
    }
    return graph;
  }

console.time("ExecutionTime");
const graph = parseInput();
// console.log(graph)

// Starting at AA, analyze best place to go based on location flow rate;
// Go there in 1 min; 
// open the valve in 1 min;
// loop:
//  look down all possible paths for highest flow rate with minutes remaining
//  use that path in 'x' jump/min
//  open the valve in 1 min
// repeat, stopping when min total is 30

// IGNORE: Flow rate 0's 
// IGNORE: valves we've already opened 


// Breadth First Search (BFS) to find all distances from a node
function getDistanceMap(nodeId, graph) {
    const distancesMap = new Map();
    const frontier = [];
    frontier.push(nodeId);
    distancesMap.set(nodeId, 0);
    while (frontier.length > 0) {
      const nodeId = frontier.shift();
      const neighborsId = graph.get(nodeId).neighbors; 
      for (const neighborId of neighborsId) {
        if (distancesMap.has(neighborId)) continue;
        frontier.push(neighborId);
        const distance = distancesMap.get(nodeId) + 1;
        distancesMap.set(neighborId, distance);
      }
    }
    return distancesMap;
}
  
function findAllPaths(currentNodeId, destNodesId, visitedNodesId, time) {
    const visited = new Set(visitedNodesId);
    visited.add(currentNodeId);
    const targets = new Set(destNodesId);
    targets.delete(currentNodeId);
  
    allPaths.add([...visited]);
  
    let maxScore = 0;
    for (const targetId of targets) {
      const timeLeft = time - distanceMaps.get(currentNodeId).get(targetId) - 1; // actual time - distance - 1 (to open the valve)
      if (timeLeft < 0) continue;
      let flow = graph.get(targetId).rate * timeLeft;
      flow += findAllPaths(targetId, targets, visited, timeLeft);
      if (flow > maxScore) {
        maxScore = flow;
      }
    }
    return maxScore;
}

// Pre-calculate the distance map for each node
// and get the nodes with a usefull (> 0) valve
const distanceMaps = new Map();
const nodesWithValve = new Set();
for (const nodeId of graph.keys()) {
    distanceMaps.set(nodeId, getDistanceMap(nodeId, graph));
    if (graph.get(nodeId).rate > 0){
        nodesWithValve.add(nodeId);
    } 
}

console.log(nodesWithValve)

const allPaths = new Set();
console.log(findAllPaths('AA', nodesWithValve, new Set(), 30));

console.timeEnd("ExecutionTime");


// part 2
// get all path 26m path
// allPaths.clear();
// console.log(findAllPaths('AA', nodesWithValve, new Set(), 26));