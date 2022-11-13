const express = require('express');
const todos = require('./api/todos');
const notFound = require('./api/not-found');

const app = express();

app.use('/', todos);

app.use('*', notFound);

module.exports = app;