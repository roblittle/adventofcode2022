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
  
  
  // part 1
  
  // Pre-calculate the distance map for each node
  // and get the nodes with a usefull (> 0) valve
  const distanceMaps = new Map();
  const nodesWithValve = new Set();
  for (const nodeId of graph.keys()) {
    distanceMaps.set(nodeId, getDistanceMap(nodeId, graph));
    if (graph.get(nodeId).rate > 0) nodesWithValve.add(nodeId);
  }
  
  const allPaths = new Set();

  
  // part 2
  // get all path 26m path
  allPaths.clear();
  findAllPaths('AA', nodesWithValve, new Set(), 26);
  
function getScorePath(path, time = 26) {
    let totalScore = 0;
    const allreadyOpened = new Set();
    for (let i=1; i<path.length; i++) {
      const prev = path[i-1];
      const curr = path[i];
      time = time - distanceMaps.get(prev).get(curr) - 1;
      if (time < 0) continue;
      let score = 0;
      if (!allreadyOpened.has(curr)) {
        score = time * graph.get(curr).rate;
        allreadyOpened.add(curr);
      }
      totalScore += score;
    }
    return totalScore;
}
  
const paths = [...allPaths];
const scoreMap = new Map();

  // now we have all paths; we must get all score paths from each path
for (let i = 0; i < paths.length; i++) {
    scoreMap.set(i, getScorePath(paths[i]));
    // purify path to keep only the valve nodes
    paths[i] = new Set(paths[i].filter(nodeId => nodesWithValve.has(nodeId)));
}
  
function everyItemIsDifferent(set1, set2) {
    for (const item of set1) {
      if (set2.has(item)) return false;
    }
    return true;
}

// this is the complicated part
let max = -Infinity;
for (let iHuman = 0; iHuman < paths.length; iHuman++) {
    for (let iElephant = iHuman + 1; iElephant < paths.length; iElephant++) {
      // search pair of paths when one path contains only the valve not cointained by the other path
      if (everyItemIsDifferent(paths[iHuman], paths[iElephant])) {
        const score = scoreMap.get(iHuman) + scoreMap.get(iElephant);
        if (score > max) max = score;
      }
    }
}
  
  console.log(max);
  console.timeEnd("ExecutionTime");