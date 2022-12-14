const fs = require('fs');
let args = process.argv.slice(2);
let inputArray = fs.readFileSync(args[0]).toString().split("\n\n");

class Monkey {
	constructor(inst) {
        this.instructions = inst;
		this.items = this.instructions[1].split(":")[1].split(",").map(Number);
        this.inspectionCount = 0;
	}

	add(item) {
		this.items.push(item);
	}

    remove(){
        this.items.shift();
    }

    inspected(){
        this.inspectionCount++;
    }
}

let monkeys = [];

for(let input of inputArray){
    let monkey = new Monkey(input.split("\n"));
    monkeys.push(monkey);
}

for(let roundCount = 1; roundCount <= 20; roundCount++){
    console.log('--------------------');
    console.log('starting round ' + roundCount)
    for(let monkey of monkeys){

        let monkeyInstr = monkey.instructions;
        console.log('starting monkey # ' + monkeyInstr[0])
        let monkeyItems = monkey.items;
    
        while(monkeyItems.length){
    
            //shift off the current first item since we tossed it to another monkey
            singleItem = parseInt(monkey.items.shift());
            monkey.inspected();
            let operation = monkeyInstr[2].split("=")[1].split(" ");
            let itemWithWorry = 0;
    
            if(operation[2] === '+'){
                itemWithWorry = singleItem + (operation[3] !== 'old' ? parseInt(operation[3]) : singleItem);
            }
            if(operation[2] === '-'){
                itemWithWorry = singleItem - (operation[3] !== 'old' ? parseInt(operation[3]) : singleItem);
    
            }
            if(operation[2] === '*'){
                itemWithWorry = singleItem * (operation[3] !== 'old' ? parseInt(operation[3]) : singleItem);
    
            }
            if(operation[2] === '/'){
                itemWithWorry = singleItem / (operation[3] !== 'old' ? parseInt(operation[3]) : singleItem);
            }
            // console.log(itemWithWorry);
            let itemWithBoredom = Math.floor(itemWithWorry / 3);
            console.log(itemWithBoredom);
            let denominator = parseInt(monkeyInstr[3].split("by")[1]);
    
            // place the item in the appropriate monkey array at end. 
            if(itemWithBoredom % denominator === 0){
                // console.log('throwing to monkey ' + parseInt(monkeyInstr[4].split("monkey")[1]));
                addItemToMonkey(parseInt(monkeyInstr[4].split("monkey")[1]), itemWithBoredom);
            }else{
                // console.log('throwing to monkey ' + parseInt(monkeyInstr[5].split("monkey")[1]));
                addItemToMonkey(parseInt(monkeyInstr[5].split("monkey")[1]), itemWithBoredom);
            }
        }
    }
    console.log('ending round ' + roundCount)
    console.log('--------------------\n\n');
    // console.log(monkeys);
}

monkeys.sort((a,b) => b.inspectionCount - a.inspectionCount);
console.log(monkeys);
console.log(monkeys[0].inspectionCount * monkeys[1].inspectionCount);

function addItemToMonkey(monkeyNum, item){
    monkeys[monkeyNum].add(item);
}




