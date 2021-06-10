// server/index.js

const express = require("express");
const cors = require("cors");
const fs = require("fs");

const PORT = process.env.PORT || 8000;
//const PORT = 8000;

const app = express();
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded());

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

app.post("/tasks", (req, res) => {
  var newTask = req.body;

  var db = fs.readFileSync("server/db.json");
  var Tasklist = JSON.parse(db);
  var id = 1;
  Tasklist.tasks.forEach((task) => {
    if (task.id >= id) {
      id = task.id + 1;
    }
    if (task.text == newTask.text && task.date == newTask.date) {
      console.log("Error: Duplicated task not saved");
      id = -1;
      return;
    }
  });

  if (id !== -1) {
    newTask = { id, ...newTask }; // add id to the task
    Tasklist.tasks = [...Tasklist.tasks, newTask];
    fs.writeFileSync("server/db.json", JSON.stringify(Tasklist));
    console.log(Tasklist);
    res.json(Tasklist.tasks);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
