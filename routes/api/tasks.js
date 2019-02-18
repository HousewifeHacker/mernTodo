const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//model
const Task = require('../../models/Task');
const List = require('../../models/List');

// GET all tasks by date descending
router.get('/', (req, res) => {
    Task.find()
        .sort({ date: -1 })
        .then(tasks => res.json(tasks));
});

router.post('/', (req, res) => {
    // list already exists
    const newTask = new Task({
        _id: new mongoose.Types.ObjectId(), //need this id for List
        name: req.body.name,
        status: req.body.status,
        list: req.body.list,
    });

    // add the id to the tasks array in List
    // tasks aray can be used for order of tasks
    newTask
        .save(err => {
            if (err) { return console.log(err) }
            List.findByIdAndUpdate(
                newTask.list,
                {$push: {tasks: newTask._id}},
                (err, doc) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json(newTask);
                    }
                }
            );
        })

});

router.delete('/:id', (req, res) => {
    const taskId = req.params.id
    Task.findByIdAndRemove(
        taskId,
        (err, doc) => {
            if (!doc) { return console.log('Error removing task') }
            List.findByIdAndUpdate(
                doc.list,
                {$pull: {tasks: taskId}},
                (err, doc) => {
                    if (!doc) {
                        // still allow but I want to know
                        console.log('Error finding parent list');
                    }
                    res.json({success: true});
                }
            );
        }
    );
});


module.exports = router;
