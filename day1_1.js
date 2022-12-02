
// Read input, split on spaces.
// Turn each set of numbers into the sum of the set single value.
// return .max value 
const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n").map(Number);

let blockTotal = 0;
let calRollUp = [];
for(let i=0;i<inputArray.length;i++){
    if(inputArray[i] === 0){
        // end of one block 
        calRollUp.push(blockTotal);
        blockTotal = 0;
    }else{
        blockTotal += inputArray[i];
    }
}

console.log(Math.max(...calRollUp));

