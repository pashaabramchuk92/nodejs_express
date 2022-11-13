const path = require('path');
const fs = require('fs');

const todosService = require('../../services');

const getTodos = (req, res) => {
    let template = '';

    const file$ = fs.createReadStream(
        path.join(__dirname, '..', '..', 'assets', 'index.html'),
        { encoding: 'utf-8' }
    );

    file$
        .on('data', (data) => template += data)
        .on('end', async () => {
            const items = await todosService.getTodos();
            const list = items.map((item) => `<li>${item.value} - ${item.date}</li>`).join('\n');

            template = template.replace('{%todos%}', list);
            res.send(template);
        })
        .on('error', () => {
            res.status(500).send('Error');
        })
}

const createTodo = (req, res) => {
    let body = '';

    req
        .on('data', (data) => body += data)
        .on('end', async () => {
            const value = body.replace('todo=', '');

            await todosService.setTodos({
                value,
                date: new Date().toISOString()
            });

            res.redirect('/');
        });
}

module.exports = {
    getTodos,
    createTodo
}