const fs = require('fs');
let args = process.argv.slice(2);
let input = fs.readFileSync(args[0]).toString();

function startOfPacket(length){
    let res
    for(let i=length;i<input.length;i++){
        let searchWindow = input.slice(i-length,i+1)
        if(!/(.).*\1/.test(searchWindow)){
            res = i+1
            i = input.length
        }
    }
    console.log(res);
}

startOfPacket(3);

// TODO try sliding window approach 

