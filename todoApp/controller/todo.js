let todoItems = require("../todo.js");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const getAllTask = (req, res) => {
  res.render("index", { todoItems });
};

const createTask = (req, res) => {
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
};

const getTask = (req, res) => {
  const { id } = req.params;
  const showTask = todoItems.find((todo) => todo.id === id);
  if (showTask) {
    res.render("show", { showTask, title: "Task" });
  } else {
    res.render("error", { msg: `no task with id :${id}` });
  }
};

const updateTask = (req, res) => {
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
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const foundTask = todoItems.find((todo) => todo.id === id);
  if (foundTask) {
    todoItems = todoItems.filter((todo) => todo.id !== id);
    res.redirect("/todo");
  } else {
    res.status(400).send("cant find this id");
  }
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
