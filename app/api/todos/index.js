const { Router } = require('express');
const { getTodos, createTodo } = require('./todos.controlller');

const router = Router();

router.get('/', getTodos);

router.get('/index.html', (req, res) => {
    res.redirect('/');
});

router.post('/', createTodo);

module.exports = router;