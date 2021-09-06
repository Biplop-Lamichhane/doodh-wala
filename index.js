const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
var Datastore = require("nedb");
var db = new Datastore("data.db");
app.use(bodyParser.json());
db.loadDatabase();
app.post("/adduser", (req, res) => {
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.send("kya he");
	}

	if (req.body.name) {
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
const date = new Date()
console.log(date)
	db.update({ _id: "hPwjJSR5QUekOp3v" }, { $push: { main: { date , morning:10 , evening:10} } });

	res.send("snet");
});

app.get("/all", (req, res) => {
	db.find({}, (err, d) => {
		res.send(d);
	});
});

app.listen(3000, () => {
	console.log(`Doodh-wala listening at http://localhost:3000`);
});
