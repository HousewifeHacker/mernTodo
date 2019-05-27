const express = require('express');
const router = express.Router();

//model
const List = require('../../models/List');
const Task = require('../../models/Task');

// just the list schema for each list
router.get('/', (req, res) => {
    const user = req.body.user;
    List.find({user: user})
        .then(lists => res.json(lists));
});

// a list and it's tasks' names
router.get('/:id', (req, res) => {
    List.findById(req.params.id)
        .populate('tasks')
        .then(list => res.json(list));
});

router.post('/', (req, res) => {
    const newList = new List({
        name: req.body.name,
    });

    newList
        .save()
        .then(list => res.json(list));
});

// used to reorder the tasks in a list
router.put('/:id', (req, res, next) => { 
    List.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, doc) => {
        if (!doc || err) {
            const error = new Error('Error updating list');
            error.status = 404;
            return next(error);
        }
        doc.tasks = req.body.tasks;
        doc.save().then(list => res.json(list));
    });
});

router.delete('/:id', (req, res, next) => {
    List.findByIdAndDelete(req.params.id, (err, doc) => {
        // couldnt find or delete id
        if (!doc || err) {
            const error = new Error('Error deleting list');
            error.status = 404;
            return next(error);
        }
        // delete the children tasks too
        Task.deleteMany({_id: {$in: list.tasks}}, (err) => {
            if (err) { return next(err) }
            res.json({success: true});
        });
    });
});

module.exports = router;
