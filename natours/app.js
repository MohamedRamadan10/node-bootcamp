const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
// 	res
// 		.status(200)
// 		.json({ message: "Hello from server side!!!", app: "Natours" });
// });

// app.post("/", (req, res) => {
// 	res.status(200).send("You can post to this endpoint...");
// });

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get("/api/v1/tours", (req, res) => {
	res.status(200).json({
		status: "success",
		result: tours.length,
		data: { tours },
	});
});

app.post("/api/v1/tours", (req, res) => {
	const newId = tours[tours.length - 1].id + 1;
	const newTour = Object.assign({ id: newId }, req.body);

	tours.push(newTour);

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			if (err) console.log(err.message);
			res.status(201).send({
				status: "success",
				data: { tour: newTour },
			});
		}
	);
});

const port = 8000;
app.listen(port, () => console.log(`Server is running on ${port}`));
