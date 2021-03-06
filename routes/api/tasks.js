const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//model
const Task = require('../../models/Task');
const List = require('../../models/List');



// GET all tasks by date descending
// not used in app, here to debug
router.get('/', (req, res) => {
    Task.find()
        .sort({ date: -1 })
        .then(tasks => res.json(tasks));
});

router.post('/', (req, res, next) => {
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
            if (err) { return next(err) }
            List.findByIdAndUpdate(
                newTask.list,
                {$push: {tasks: newTask._id}},
                (err, doc) => {
                    if (err || !doc) {
                        const error = new Error('Error adding task id to list');
                        error.status = 404;
                        return next(error);
                    } else {
                        res.json(newTask);
                    }
                }
            );
        })

});

router.delete('/:id', (req, res, next) => {
    const taskId = req.params.id
    Task.findByIdAndRemove(
        taskId,
        (err, doc) => {
            if (!doc || err) {
                const error = new Error('Error removing task');
                error.status = 404;
                return next(error);
            }
            List.findByIdAndUpdate(
                doc.list,
                {$pull: {tasks: taskId}},
                (err, doc) => {
                    if (!doc || err) {
                        const error = new Error('Error finding parent list');
                        error.status = 410;
                        return next(error);
                    }
                    res.json({success: true});
                }
            );
        }
    );
});

router.put('/:id', (req, res, next) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, doc) => {
        // TODO move to another list
        if (!doc || err) {
            const error = new Error('Error updating task');
            error.status = 404;
            return next(error);
        }
        // just status for now
        doc.status = req.body.status;
        doc.save()
            .then(task => res.send(task))
            .catch(err => res.status(500).json(err));
    });
});


module.exports = router;
