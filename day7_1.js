const fs = require('fs');
let args = process.argv.slice(2);
let input = fs.readFileSync(args[0]).toString().split("\n");

// Struggled with this question until i found https://github.com/FriendlyUser1/adventofcode/blob/main/2022/day7/tree.js 

class Tree {
	constructor() {
		this.view = {};
		this.pwd = [];
	}

	add(item) {
		let curDir = this.pwd.reduce((curDir, d) => curDir[d], this.view);
		curDir[item[1]] = !isNaN(item[0]) ? parseInt(item[0]) : {};
	}

	cd(name) {
		if (name === "/") this.pwd = [];
		else if (name === "..") this.pwd.pop();
		else this.pwd.push(name);
	}
}

let tree = new Tree();
// Build tree
for (let i = 0; i < input.length; i++) {
	let ins = input[i].split(" ");
	if (ins[0] === "$") {
		if (ins[1] === "cd") tree.cd(ins[2]);
	} else {
		tree.add(ins);
	}
}

let dirs = {};

// Get sizes of directories
const crawl = (dir = "", branch = tree.view) => {
	let size = 0;
	for (let [k, v] of Object.entries(branch)) {
		if (!isNaN(v)) size += v;
		else size += crawl(`${dir}/${k}`, branch[k]);
	}
	dirs[dir ? dir : "/"] = size;
	return size;
};

crawl();

dirs = Object.fromEntries(Object.entries(dirs).sort((a, b) => a[1] - b[1]));

console.log(
	`Small directory sizes: ${Object.values(dirs)
		.filter((n) => n < 100000)
		.reduce((a, n) => a + n, 0)}`
);