const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "/seeders")));
app.set("views", path.join(__dirname, "/public"));

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/exercise", (req, res) => {
  res.render("exercise.html");
});

app.get("/stats", (req, res) => {
  res.render("stats.html");
});

app.listen(3000, () => console.log("Connected on port: 3000"));
