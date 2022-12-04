// read input
const fs = require('fs');
let args = process.argv.slice(2);
let inputArray = fs.readFileSync(args[0]).toString().split("\n");

let charMap = new Map([['a',1],['b',2],['c',3],['d',4],['e',5],['f',6],['g',7],
['h',8],['i',9],['j',10],['k',11],['l',12],['m',13],['n',14],['o',15],
['p',16],['q',17],['r',18],['s',19],['t',20],['u',21],['v',22],['w',23],
['x',24],['y',25],['z',26],['A',27],['B',28],['C',29],['D',30],['E',31],
['F',32],['G',33],['H',34],['I',35],['J',36],['K',37],['L',38],['M',39],
['N',40],['O',41],['P',42],['Q',43],['R',44],['S',45],['T',46],['U',47],
['V',48],['W',49],['X',50],['Y',51],['Z',52]]);

let ruckSackSum = 0;

// grab each set of 3 consecutive rows
for(let i=0;i<inputArray.length;i=i+3){
    let fLine = inputArray[i];
    let sLine = inputArray[i+1];
    let tLine = inputArray[i+2];

    let commonChars = charParser(fLine, sLine, tLine);

    // for characters in both, translate char into int.
    for(commonCh of commonChars.keys()){
        ruckSackSum += charMap.get(commonCh);
    }
}

// return sum of those resulting ints
console.log(ruckSackSum);

function charParser(lineOne, lineTwo, lineThree){
    let charsCommonInAll3 = new Map();
    for(char of lineOne){
        if(lineTwo.indexOf(char)!= -1){
            if(lineThree.indexOf(char)!= -1){
                if(!charsCommonInAll3.has(char))
                    charsCommonInAll3.set(char, char);
            }
            
        }
    }
    return charsCommonInAll3;
}