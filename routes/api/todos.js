const express = require('express');
const router = express.Router();

const ToDoController = require('../../controllers/todo');

//C
router.post('/', ToDoController.createTodo);
//R
router.get('/', ToDoController.getTodos);
//U
router.put('/', ToDoController.updateTodo);
//D
router.delete('/', ToDoController.removeTodo);

module.exports = router;