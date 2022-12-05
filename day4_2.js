// read input
const fs = require('fs');
let args = process.argv.slice(2);
let inputArray = fs.readFileSync(args[0]).toString().split("\n");

let rangeOverlaps = 0;

// parse each row, splitting the 2 values on comma delmit
for(let i=0;i<inputArray.length;i++){
    let val1 = inputArray[i].slice(0,inputArray[i].indexOf(','));
    let val2 = inputArray[i].slice(inputArray[i].indexOf(',')+1, inputArray[i].length)
    let val1LowerLimit = val1.slice(0, val1.indexOf('-'));
    let val1UpperLimit = val1.slice(val1.indexOf('-')+1, val1.length);
    let val2LowerLimit = val2.slice(0, val2.indexOf('-'));
    let val2UpperLimit = val2.slice(val2.indexOf('-')+1, val2.length);

    // if any value range overlaps *at all*, even 1 value... increment rangeOverlaps
    if(parseInt(val1LowerLimit) <= parseInt(val2LowerLimit) && 
        parseInt(val1UpperLimit) >= parseInt(val2LowerLimit)){
        rangeOverlaps += 1;
        continue;
    }
    if(parseInt(val2LowerLimit) <= parseInt(val1LowerLimit) && 
    parseInt(val2UpperLimit) >= parseInt(val1LowerLimit)){
        rangeOverlaps += 1;
        continue;
    }
    
}
console.log(rangeOverlaps);



