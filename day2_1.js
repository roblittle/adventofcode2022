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

let neededOutcomeHash = new Map();
neededOutcomeHash.set('X', 'lose');
neededOutcomeHash.set('Y', 'draw');
neededOutcomeHash.set('Z', 'win');

let totalScore = 0;

// determine who wins each go, tally up points, rinse repeat.
for(let i=0;i<inputArray.length;i++){
    // destruct and acquire needed per line input
    let rowItems = inputArray[i].split(" ");
    let them = rowItems[0], neededOutcome = rowItems[1];

    if(neededOutcomeHash.get(neededOutcome) === 'win'){
        // set me based on them
        if(them === 'C'){
            me = 'A'
        }
        if(them === 'B'){
            me = 'C'
        }
        if(them === 'A'){
            me = 'B'
        }
        totalScore += shapeScoreHash.get(me) + roundOutcomeHash.get('win')
    }

    if(neededOutcomeHash.get(neededOutcome) === 'lose'){
        // set me based on them.
        if(them === 'C'){
            me = 'B'
        }
        if(them === 'B'){
            me = 'A'
        }
        if(them === 'A'){
            me = 'C'
        }
        totalScore += shapeScoreHash.get(me) + roundOutcomeHash.get('lose')
    }

    if(neededOutcomeHash.get(neededOutcome) === 'draw'){
        let me = them;
        totalScore += shapeScoreHash.get(me) + roundOutcomeHash.get('draw')
    }
    
}
console.log(totalScore)

