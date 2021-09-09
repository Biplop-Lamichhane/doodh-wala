const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
var Datastore = require("nedb");
var db = new Datastore("data.db");
app.use(bodyParser.json());
db.loadDatabase();
app.post("/adduser", (req, res) => {
	const payload = { username: req.body.name };

	if ((payload["username"] !== undefined || "") && payload.username) {
		let name = req.body.name;
		let newdaya = [
			{
				name,
				main: [],
			},
		];
		res.send(newdaya);
		console.log(req.body);
		db.insert(newdaya);
	} else {
		res.send("invalid");
	}
});
app.get("/", (req, res) => {
	res.send(`
 <form method="POST" action="http://localhost:3000/adduser">
            <input name="name" placeholder="enter name">
	    <input type="submit">
 </form>
`);
});

app.get("/up", (req, res) => {
	const date = new Date();
	console.log(date);
	db.update(
		{ _id: "hPwjJSR5QUekOp3v" },
		{ $push: { main: { date, morning: 10, evening: 10 } } }
	);

	res.send("snet");
});

app.get("/:find", (req, res) => {
	const uid = req.params.find;
	db.findOne({ _id: uid }, (err, doc) => {
		res.send(doc);
console.log( doc)


});
});

app.get("/all", (req, res) => {
	db.find({}, (err, document) => {
		console.log(document);

		res.send(document);
	});
});

app.listen(3000, () => {
	console.log(`Doodh-wala listening at http://localhost:3000`);
});
