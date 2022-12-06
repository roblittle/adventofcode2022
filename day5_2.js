// read input
const fs = require('fs');
let args = process.argv.slice(2);
let inputArray = fs.readFileSync(args[0]).toString().split("\n\n");

// inputArray is now 2 values... rows 0-9 are the stacks, after that is instructions; separate them.
let inputStackArr = inputArray[0].split("\n");
let instructions = inputArray[1].split("\n");

let stackMap = new Map();
stackMap.set(1,['R', 'N', 'F', 'V', 'L', 'J', 'S', 'M']);
stackMap.set(2,['P', 'N', 'D', 'Z', 'F', 'J', 'W', 'H']);
stackMap.set(3,['W', 'R', 'C', 'D', 'G']);
stackMap.set(4,['N', 'B', 'S']);
stackMap.set(5,['M', 'Z', 'W', 'P', 'C', 'B', 'F', 'N']);
stackMap.set(6,['P', 'R', 'M', 'W']);
stackMap.set(7,['R', 'T', 'N', 'G', 'L', 'S', 'W',]);
stackMap.set(8,['Q', 'T', 'H', 'F', 'N', 'B', 'V']);
stackMap.set(9,['L', 'M', 'H', 'Z', 'N', 'F']);


// properly 'stackify' the inputStackArr data
// for(let row=8;row>=0;row--){
//     let insertables = inputStackArr[row].split(" ");
//     for(let col=0;col<insertables.length;col++){
//         console.log(insertables[col]);
//         let stack = stackMap.get(col+1);

//         //ignore empty stack values, and the stack numeric identifyers 
//         if(stack === undefined) break;   
//         if(!isNaN(insertables[col])) break;

//         //TODO somnething in here is causing the stack builder to fuck up after no val 
           // TODO hardcoed the setMap for now to get around this.  but otherwise, this 
           // dies on a 'lower' stack than last, and will repeat itself early instead 
           // of finishing the 'row' its on past the gap.  

//         // setup the stack
//         stack.push(insertables[col]);
//     }
// }

for (singleInst of instructions){
    let singleInstruction = singleInst.split(" ");
    // important indexes:
    //    singleInstruction[1]   // loop count / number of itmes to pop off
    //    singleInstruction[3]   // source stack identifyier, POP here
    //    singleInstruction[5]   // target stack identifyier, PUSH here
    let count = parseInt(singleInstruction[1]);
    let sourceStack = parseInt(singleInstruction[3]);
    let destStack = parseInt(parseInt(singleInstruction[5]));

    if(count > 0){
        let length = stackMap.get(sourceStack).length;
        stackMap.set(destStack, stackMap.get(destStack).concat(stackMap.get(sourceStack).slice(length-count, length)));
        stackMap.set(sourceStack, stackMap.get(sourceStack).slice(0, length-count));
    }

}

console.log(stackMap.get(1).pop() + stackMap.get(2).pop() + stackMap.get(3).pop() + 
  stackMap.get(4).pop() + stackMap.get(5).pop() + stackMap.get(6).pop() + 
  stackMap.get(7).pop() + stackMap.get(8).pop() + stackMap.get(9).pop());




