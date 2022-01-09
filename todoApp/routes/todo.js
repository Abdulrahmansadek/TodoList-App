const express = require("express");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const router = express.Router();

let todoItems = [
  { task: "walk the dogs", id: "123" },
  { task: "walk the cats", id: "111" },
];

//get all tasks
router.get("/", (req, res) => {
  res.render("index", { todoItems });
});
// create the add route
router.get("/add", (req, res) => {
  res.render("add");
});

// create task
router.post("/", (req, res) => {
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
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const showTask = todoItems.find((todo) => todo.id === id);
  if (showTask) {
    res.render("show", { showTask, title: "Task" });
  } else {
    res.render("error", { msg: `no task with id :${id}` });
  }
});

//create edit route

router.get("/:id/edit", (req, res) => {
  const { id } = req.params;
  const foundTask = todoItems.find((todo) => todo.id === id);
  if (foundTask) {
    res.render("edit", { foundTask });
  } else {
    res.render("error", { msg: `no task with id :${id}` });
  }
});

//update task

router.patch("/:id", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const foundTask = todoItems.find((todo) => todo.id === id);
  if (foundTask) {
    todoItems = todoItems.filter((todo) => todo.id !== id);
    res.redirect("/todo");
  } else {
    res.status(400).send("cant find this id");
  }
});

module.exports = router;
