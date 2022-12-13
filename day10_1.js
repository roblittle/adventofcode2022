const fs = require('fs');
var args = process.argv.slice(2);
var inputArray = fs.readFileSync(args[0]).toString().split("\n")

// read instructions
// count no-op as 1 but others as 2 cycles
// perform the cycle math 
// at 20/60/100/140/180/220, add the value to signalSum 

let signalSum = 0;
let cycle = 1;
let registerX = 1;

for(const line of inputArray) {
    // handle noop vs instructions we care about
    const loops = line.startsWith("addx") ? 2 : 1;

    // loop accordingly; checking cycle 20 or mod40s
    for(let i = 0; i < loops; i++) {
        if((cycle - 20) % 40 === 0) {
            signalSum += cycle * registerX;
        }
        cycle++;
    }

    // every second loop add the addx value to registerX, otherwise add nothing
    registerX += loops === 2 ? +line.split(" ")[1] : 0;
}

console.log(signalSum)