const express = require('express');

const router = express.Router();

const todos = require('./api/todos');

router.use('/todos', todos);

module.exports = router;
