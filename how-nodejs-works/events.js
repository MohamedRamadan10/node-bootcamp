const eventEmitter = require("events");
const http = require("http");

class Sales extends eventEmitter {
	constructor() {
		super();
	}
}

const myEvent = new Sales();

myEvent.on("newSale", () => console.log("There was a new sale!"));
myEvent.on("newSale", () => console.log("Customer name is: Mohamed Ramadan"));
myEvent.on("newSale", (stock) =>
	console.log(`There are now ${stock} items in the stock`)
);

myEvent.emit("newSale", 9);

/**********************************************/
const server = http.createServer();

server.on("request", (req, res) => {
	res.end("Request Received");
	console.log(req.url, "Request Received");
});
server.on("request", (req, res) => console.log("Another request Received 😀"));

server.on("close", () => console.log("Server closed"));

server.listen(8000, "127.0.0.1", () =>
	console.log("Waiting for request....💻")
);
