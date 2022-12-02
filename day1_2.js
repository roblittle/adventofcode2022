
// Read input, split on spaces.
// Turn each set of numbers into the sum of the set single value.
// return .max value of highest 3
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

// sort descending so we can slice easily without index headaches 
function findLargest3() {
    calRollUp.sort((a, b) => a < b ? 1 : a > b ? -1 : 0);
    // console.log(calRollUp.slice(0, 3));
    return calRollUp.slice(0, 3);
}

console.log(findLargest3().reduce((a,b) => a+b, 0));

