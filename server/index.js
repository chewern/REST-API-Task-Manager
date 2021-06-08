// server/index.js

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const PORT = 8000;

const app = express();

app.use(cors());

app.get("/tasks", (req, res) => {
  var db = fs.readFileSync("server/db.json"); // cannot use require here because require will send the cached old data
  var Tasklist = JSON.parse(db);
  res.json(Tasklist.tasks);

  console.log(`Server sent data from port ${PORT}`);
});

app.delete("/tasks/:id", (req, res) => {
  var removeID = parseInt(req.params.id);
  var db = fs.readFileSync("server/db.json");
  var Tasklist = JSON.parse(db);
  Tasklist.tasks = Tasklist.tasks.filter((task) => {
    return task.id !== removeID;
  });
  fs.writeFileSync("server/db.json", JSON.stringify(Tasklist));
  console.log(Tasklist);
});

app.post("/tasks/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
