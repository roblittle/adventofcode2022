const pairs = require("fs").readFileSync(`./day13_input`, "utf-8").split("\n\n");

// Alot simpler than a formal number-checking function!  thanks google/github suggestions!
let num = Number.isFinite;

// The work horse... determine if comparables are same (ie: numbers or objects)
function compare(l, r){
        // base case, both numbers, return comparison result as +ve == in order, -ve not
		if (num(l) && num(r)) {
			if (l < r) return 1;
			if (l > r) return -1;
        // only left side number, right side is object - make left object and re-compare
		} else if (num(l)) return compare([l], r);
        // only right side is number, left side is object - make right object and re-compare
		else if (num(r)) return compare(l, [r]);
        // nothing is a number, its either undefined or an object.... 
		else {
            
			if (l === undefined) return 1;
			else if (r === undefined) return -1;
            // things are objects here... so, lets compare each internal value of the object
			for (let i = 0; i < Math.max(l.length, r.length); i++) {
				let comp = compare(l[i], r[i], i);
				if (comp !== 0) return comp;
			}

            // final in-object comoparison, maintaing left smaller than right as +ve
			if (l.length < r.length) return 1;
			if (l.length > r.length) return -1;
		}

		return 0;
	};

let inOrder = 0;

for (let j = 0; j < pairs.length; j++) {
	let pair = pairs[j].split("\n");

    // CRITICAL to parse not just use... or else brackets will fuck it all up
	let packet1 = JSON.parse(pair[0]),
		packet2 = JSON.parse(pair[1]),
		maxlen = Math.max(packet1.length, packet2.length);

    // increment the inOrder count accordingly 
	if (maxlen < 1) inOrder += j + 1;

    // obtain single values from each signal packet
	for (let i = 0; i < maxlen; i++) {
		let left = packet1[i],
			right = packet2[i],
			ordered = compare(left, right);

		if (ordered > 0) inOrder += j + 1;
		if (ordered !== 0) break;
		if (i === maxlen - 1) inOrder += j + 1;
	}
}
// Part 2
const packets = pairs.flatMap((p) => p.split("\n")).concat(["[[2]]", "[[6]]"]);

let divider1 = 1,
	divider2 = 1;

for (let i = 0; i < packets.length; i++) {
	if (compare(JSON.parse(packets[i]), [[2]]) === 1) divider1++;
	if (compare(JSON.parse(packets[i]), [[6]]) === 1) divider2++;
}

console.log(`Decoder key: ${divider1 * divider2}`);

