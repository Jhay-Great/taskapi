const uuid = require('uuid');
let taskDB = [];
const taskBin = [];

// console.log(uuid.v4())

// HELPER FUNCTIONS
const findById = (id) => taskDB.filter(task => task.id === id);

const createPost = function (req, res) {
    const {title, task, status} = req.body;

    // error handling
    if (!task) {
        return res.status(401).json({
            error: true,
            message: 'You cannot leave task body empty',
        })
    }
    
    const savedTask = {
        id: uuid.v4(),
        title: title || 'My task',
        post: task,
        status: status || 'Not completed',
    }
    taskDB.push(savedTask);

    return res.status(201).json({message: 'Content posted successfully'})
}

// reading all posts
const displayAllPost = function(req, res) {
    return res.status(200).json({
        post: taskDB,
    })
}

// read individual post by id
const displayTaskById = function (req, res) {
    const { id } = req.params;
    const task = findById(id);

    return res.status(200).json({
        task,
    })
}

// update title and body task
const updateTask = function (req, res) {
    const {title, task} = req.body;
    const { id } = req.params;

    const savedTask = findById(+id);
    const updatedTask = {
        ...savedTask,
        title,
        task,
    }

    console.log(updateTask);



}

// change / update task status
const updateStatus = function (req, res) {
    const { status } = req.body;
    const { id } = req.params;

    // warrants further research
    const updatedDB = taskDB.map(task => {
        if (task.id !== id) return;
        const updatedStatus = {
            ...task,
            status,
        }

        console.log(updatedStatus);
        return updatedStatus

    });

    taskDB = updatedDB;
    console.log(taskDB);

    res.status(201).json({
        message: 'Updated was successful',
    })

}

// deleting task
const deleteTask = function (req, res) {
    const { id } = req.params;
    
    const db = taskDB.filter(task => task.id !== id);
    taskDB = db;
    
    return res.status(200).json({
        db: taskDB,
        message: 'Successfully deleted task',
    })
}

module.exports = {
    createPost,
    displayAllPost,
    displayTaskById,
    updateTask,
    updateStatus,
    deleteTask
}