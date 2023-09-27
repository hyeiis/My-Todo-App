const express = require("express");
const router = express.Router();
const controller = require("../controller/controller");

router.get("/", controller.index);
// show all todos
router.get("/todos", controller.show_todos);
// create a new todo
router.post("/todo", controller.create_todo);
// edit a specific todo
router.patch("/todo/:todoId", controller.edit_todo);
// remove a specific todo
router.delete("/todo/:todoId", controller.remove_todo);

module.exports = router;
