
const pairs = require("fs").readFileSync(`./day13_input`, "utf-8").split("\n\n");
let num = Number.isFinite;
function compare(l, r){
		if (num(l) && num(r)) {
			if (l < r) return 1;
			if (l > r) return -1;
		} else if (num(l)) return compare([l], r);
		else if (num(r)) return compare(l, [r]);
		else {
			if (l === undefined) return 1;
			else if (r === undefined) return -1;

			for (let i = 0; i < Math.max(l.length, r.length); i++) {
				let comp = compare(l[i], r[i], i);
				if (comp !== 0) return comp;
			}

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

	if (maxlen < 1) inOrder += j + 1;

	for (let i = 0; i < maxlen; i++) {
		let left = packet1[i],
			right = packet2[i],
			ordered = compare(left, right);

		if (ordered > 0) inOrder += j + 1;
		if (ordered !== 0) break;
		if (i === maxlen - 1) inOrder += j + 1;
	}
}

console.log(`Sum of indices of pairs in order: ${inOrder}`); // Part 1
