const path = require('path');
const fs = require('fs');

const file_path = path.join(__dirname, '..', 'assets', 'todos.json')
let todos = null;

const getTodos = async () => {
    if (todos) return todos;

    try {
        fs.accessSync(file_path);
    } catch {
        todos = [];
        return todos;
    }

    const file$ = fs.createReadStream(file_path, { encoding: 'utf-8' });
    
    const items = await new Promise((res, rej) => {
        let result = '';

        file$
            .on('data', (data) => result += data)
            .on('end', () => {
                res(result);
            })
            .on('error', rej)
    });

    todos = JSON.parse(items);

    return todos;
}

const setTodos = async (item) => {
    if (!todos) {
        todos = await getTodos();
    }

    todos.push(item);

    const file$ = fs.createWriteStream(file_path, { encoding: 'utf-8' });

    file$.end(JSON.stringify(todos));

    return todos;
}

module.exports = {
    getTodos,
    setTodos
}