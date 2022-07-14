const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
	// fs.readFile("./text.txt", (err, data) => {
	// 	if (err) console.log(err);
	// 	res.end(data);
	// });

	/* Streams */
	const readable = fs.createReadStream("./text.txt");

	// readable.on("data", (chunk) => res.write(chunk));
	// readable.on("end", () => res.end());
	// readable.on("error", (err) => {
	// 	console.log(err);
	// 	res.statusCode = 404;
	// 	res.end("File not found");
	// });

    readable.pipe(res)
});

server.listen(8000, "127.0.0.1", () => console.log("Waiting request...👩‍💻"));
