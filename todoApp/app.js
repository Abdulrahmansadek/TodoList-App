const express = require("express");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//add methodoverride middleware
app.use(methodOverride("_method"));

// add handlebars middleware
app.set("view engine", "handlebars");
app.engine("handlebars", engine({ defaultLayout: "main" }));

// static folder
app.use(express.static(path.join(__dirname, "public")));

let todoItems = [
  { task: "walk the dogs", id: "123" },
  { task: "walk the cats", id: "111" },
];
//get all tasks
app.get("/todo", (req, res) => {
  res.render("index", { todoItems });
});
// create the add route
app.get("/todo/add", (req, res) => {
  res.render("add");
});

// create task
app.post("/todo", (req, res) => {
  const newItem = req.body;
  const { task, description } = newItem;
  if (!task || !description) {
    res.status(400).send("please enter a task or and description !!");
  } else {
    todoItems.push({
      ...newItem,
      id: uuidv4(),
      time: moment().format("MMMM Do YYYY, h:mm a"),
    });
    res.redirect("/todo");
  }
});

// create the show route
app.get("/todo/:id", (req, res) => {
  const { id } = req.params;
  const showTask = todoItems.find((todo) => todo.id === id);
  if (showTask) {
    res.render("show", { showTask, title: "Task" });
  } else {
    res.render("error", { msg: `no task with id :${id}` });
  }
});

//create edit route

app.get("/todo/:id/edit", (req, res) => {
  const { id } = req.params;
  const foundTask = todoItems.find((todo) => todo.id === id);
  if (foundTask) {
    res.render("edit", { foundTask });
  } else {
    res.render("error", { msg: `no task with id :${id}` });
  }
});

//update task

app.patch("/todo/:id", (req, res) => {
  const { id } = req.params;
  const newTask = req.body;
  const { task, description } = newTask;
  const foundTask = todoItems.find((todo) => todo.id === id);
  if (foundTask) {
    if (task) {
      foundTask.task = task;
    }
    if (description) {
      foundTask.description = description;
    }

    res.redirect("/todo");
  }
});

//delete task

app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const foundTask = todoItems.find((todo) => todo.id === id);
  if (foundTask) {
    todoItems = todoItems.filter((todo) => todo.id !== id);
    res.redirect("/todo");
  } else {
    res.status(400).send("cant find this id");
  }
});

app.listen(PORT, () => {
  console.log(`the server running on http://localhost:${PORT}`);
});
