const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
app.use(bodyParser.json());
mongoose
  .connect("mongodb://localhost:27017/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo Connection open"))
  .catch((err) => console.log("oh no! mongo error", err));

const db = require("./models");

app.use(express.static(path.join(__dirname, "public")));

app.get("/exercise", (req, res) => res.sendFile(path.join(__dirname, "./public/exercise.html")))

app.get("/stats", (req, res) => res.sendFile(path.join(__dirname, "./public/stats.html")))

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")))

app.post("/api/workouts", (req, res) => {
  db.Workout.create({}).then((m) => res.json(m));
})

app.put("/api/workouts/:id", (req, res) => {
  console.log('put', req.params.id);
  console.log('req.body: ', req.body);
  db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true, runValidators: true }).then(data => res.json({}));
})



app.listen(3000, () => console.log("Connected on port: 3000"));
