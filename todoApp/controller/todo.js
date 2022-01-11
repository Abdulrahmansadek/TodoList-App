let todoItems = require("../todo.js");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

const getAllTask = (req, res) => {
  res.render("index", { todoItems });
};

const createTask = (req, res) => {
  const newItem = {
    task: req.body.task,
    description: req.body.description,
    id: uuidv4(),
    time: moment().format("MMMM Do YYYY, h:mm a"),
  };

  const { task, description } = newItem;
  if (!task) {
    res.status(400).render("error", {
      msg: "You did not include a task , please add task field ! ",
    });
  } else if (!description) {
    res
      .status(400)
      .send(
        "You did not include a description , please add description field ! "
      );
  } else {
    todoItems.push(newItem);
    res.redirect("/todo");
  }
};

const getTask = (req, res) => {
  const { id } = req.params;
  const showTask = todoItems.find((todo) => todo.id === id);
  if (showTask) {
    res.render("show", { showTask, title: "Task" });
  } else {
    res.status(404).render("error", { msg: `no task with id :${id}` });
  }
};

const updateTask = (req, res) => {
  const newTask = req.body;
  const { task, description } = newTask;
  const foundTask = todoItems.find((todo) => todo.id === req.params.id);
  if (foundTask) {
    if (task) {
      foundTask.task = task;
    }
    if (description) {
      foundTask.description = description;
    }

    res.redirect("/todo");
  } else {
    res.render("error", { msg: "this id is not exist" });
  }
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const foundTask = todoItems.find((todo) => todo.id === id);
  if (foundTask) {
    todoItems = todoItems.filter((todo) => todo.id !== id);
    res.redirect("/todo");
  }
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
