// read input
const fs = require('fs');
let args = process.argv.slice(2);
let inputArray = fs.readFileSync(args[0]).toString().split("\n");

// rule engine
let shapeScoreHash = new Map();
// me
shapeScoreHash.set('X', 1);
shapeScoreHash.set('Y', 2);
shapeScoreHash.set('Z', 3);
// them
shapeScoreHash.set('A', 1);
shapeScoreHash.set('B', 2);
shapeScoreHash.set('C', 3);

let roundOutcomeHash = new Map();
roundOutcomeHash.set('lose', 0);
roundOutcomeHash.set('draw', 3);
roundOutcomeHash.set('win', 6);

let totalScore = 0;

// determine who wins each go, tally up points, rinse repeat.
for(let i=0;i<inputArray.length;i++){
    // destruct and acquire needed per line input
    let rowItems = inputArray[i].split(" ");
    let them = rowItems[0], me = rowItems[1];
    
    //handle special case of rock beating scissors aka 1 > 3, for them or me.
    if(them === 'A' && me === 'Z'){
        // lose
        totalScore += shapeScoreHash.get(me) + roundOutcomeHash.get('lose');
        continue;
    }
    if(me === 'X' && them === 'C'){
        // win 
        totalScore += shapeScoreHash.get(me) + roundOutcomeHash.get('win');
        continue;
    }

    // otherwise, we can use hash map to say 'greater wins' 
    if(shapeScoreHash.get(me) > shapeScoreHash.get(them)){
        totalScore += shapeScoreHash.get(me) + roundOutcomeHash.get('win');

    }
    if(shapeScoreHash.get(me) < shapeScoreHash.get(them)){
        totalScore += shapeScoreHash.get(me) + roundOutcomeHash.get('lose');

    }
    if(shapeScoreHash.get(me) === shapeScoreHash.get(them)){
        totalScore += shapeScoreHash.get(me) + roundOutcomeHash.get('draw');

    }
    
}
console.log(totalScore)

