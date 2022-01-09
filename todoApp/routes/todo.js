const express = require("express");
const router = express.Router();
let todoItems = require("../todo.js");
const todoController = require("../controller/todo");

//get all tasks
router.get("/", todoController.getAllTask);

// create the add route
router.get("/add", (req, res) => {
  res.render("add");
});

// create task
router.post("/", todoController.createTask);

// create the show route
router.get("/:id", todoController.getTask);

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

router.patch("/:id", todoController.updateTask);

//delete task

router.delete("/:id", todoController.deleteTask);

module.exports = router;
