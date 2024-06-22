const express = require('express');

const {
    createPost,
    displayAllPost,
    displayTaskById,
    updateTask,
    updateStatus,
    deleteTask
} = require('./controller/task.controller');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({message: 'app is running navigate to your preferred endpoint'});
})

// ENDPOINTS
// POST - NEW TASK
app.post('/tasks', createPost);
// GET - ALL TASKS
app.get('/tasks', displayAllPost);
// GET - TASK BY ID
app.get('/tasks/:id', displayTaskById);
// PUT - CHANGE/UPDATE TITLE AND BODY TASK
app.put('/tasks/:id', updateTask);
// PATCH - CHANG/UPDATE TASK STATUS
app.patch('/tasks/:id/', updateStatus);
// DELETE - A TASK FROM THE ARRAY DB
app.delete('/tasks/:id/remove', deleteTask);

app.use('*', (req, res) => {
    return res.status(404).json({
        message: 'Endpoint not found'
    })
})

module.exports = app;