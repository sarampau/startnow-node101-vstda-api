const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();


// add your code here
var todoItems = [
    {
        todoItemId: 0,
        name: 'an item',
        priority: 3,
        completed: false
    },
    {
        todoItemId: 1,
        name: 'another item',
        priority: 2,
        completed: false 
    },
    {
        todoItemId: 2,
        name: 'a done item',
        priority: 1,
        completed: true
    }
];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    let result = {
        status: "ok"
    };
    res.status(200)
        .json(result);
});

app.get('/api/TodoItems', (req, res) => {
    res.status(200).send(todoItems);
    // res.json(todoItems);
});

app.get('/api/TodoItems/:number', (req, res) => {
    let id = parseInt(req.params.number);
    
    // Find the corresponding todo item (based on the todoItemId)
    for (let i = 0; i < todoItems.length; i++) {
        let todo = todoItems[i];
        
        // then just return the found todo item
        if (todo.todoItemId === id) {
            res.json(todo);
            return;
        }
    }
    
res.status(404).send("Not found!");

});

app.post('/api/TodoItems/', (req, res) => {
    let newTodo = parseInt(req.body.todoItemId);
    for (let i = 0; i < todoItems.length; i++) {
        if (newTodo === todoItems[i].todoItemId) {
            todoItems[i] = req.body;
        } else {
            todoItems.push(req.body);
        }
    }
    res.status(201).json(req.body);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    let id = parseInt(req.params.number);
    for (let i = 0; i < todoItems.length; i++) {
        if (id === todoItems[i].todoItemId) {
        let item = todoItems.splice(i, 1);
        return res.json(item[0]);
        }    
    }
    res.status(200).send();
});

module.exports = app;
