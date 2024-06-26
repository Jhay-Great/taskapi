const uuid = require('uuid');
let taskDB = [];

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
    try {
        if (taskDB.length === 0) {
            return res.status(403).json({
                message: 'No task available, kindly create a task.'
            })
        }

        return res.status(200).json({
            posts: taskDB,
        })
        
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'})
    }
}

// read individual post by id
const displayTaskById = function (req, res) {
    const { id } = req.params;

    const task = findById(id);


    if (task.length === 0) {
        return res.status(403).json({
            message: 'Data you\'re looking for no longer exists'
        })
    }

    return res.status(200).json({
        task,
    })
}

// update title and body task
const updateTask = function (req, res) {
    const {title, task: taskBody} = req.body;
    const { id } = req.params;
    
    const updatedDB = taskDB.map(task => {
        if (task.id !== id) return task;
        const updatedStatus = {
            ...task,
            title,
            task: taskBody,
        }
        
        return updatedStatus

    });

    taskDB = updatedDB;

    return res.status(200).json({
        message: 'Task updated successfully',
        updateData,
    })

}

// change / update task status
const updateStatus = function (req, res) {
    const { status } = req.body;
    const { id } = req.params;

    const updatedDB = taskDB.map(task => {
        if (task.id !== id) return task;
        const updatedStatus = {
            ...task,
            status,
        }
        
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
        posts: taskDB,
        message: 'Successfully deleted task',
    })
}

// updating task function
// const updateData = function (...data) {
//     const [title, taskBody, status] = data;
//     console.log({data, title, status, taskBody})
//     const currentDB = taskDB.map(task => {
//         if (task.id !== id) return;
//         const updatedData = {
//             ...task,
//             title: title || task.title,
//             task: taskBody || task.task,
//             status: status || task.status,

//         }
//         return updatedData
//     })
//     return currentDB;
// }

module.exports = {
    createPost,
    displayAllPost,
    displayTaskById,
    updateTask,
    updateStatus,
    deleteTask
}