const fs = require("fs");

// Blocking , synchronous way
// const dataInt = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(dataInt);

// const dataOut = `This is what we know about the avocado: ${dataInt}.\n Created At ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", dataOut);
// console.log("File is written");

// NOn-blocking , asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, dataOne) => {
	if (err) console.log("ERROR!! 💥");
	fs.readFile(`./txt/${dataOne}.txt`, "utf-8", (err, dataTwo) => {
		if (err) console.log("ERROR!! 💥");
		fs.writeFile("./txt/final.txt", `${dataOne}\n\n${dataTwo}`, (err) => {
			if (err) console.log("ERROR!! 💥");
			console.log("File is written 😉");
		});
	});
});
console.log("Reading File..........");
