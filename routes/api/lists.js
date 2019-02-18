const express = require('express');
const router = express.Router();

//model
const List = require('../../models/List');
const Task = require('../../models/Task');

// just the list schema for each list
router.get('/', (req, res) => {
    List.find()
        .then(lists => res.json(lists));
});

// a list and it's tasks' names
router.get('/:id', (req, res) => {
    List.findById(req.params.id)
        .populate({
            path: 'tasks',
            select: 'name',
            options: {sort: {date: -1}}
        }).then(list => res.json(list));
});

router.post('/', (req, res) => {
    const newList = new List({
        name: req.body.name,
    });

    newList
        .save()
        .then(list => res.json(list));
});

router.delete('/:id', (req, res) => {
    // This mongoose helper uses a callback
    List.findByIdAndDelete(req.params.id, (err, list) => {
        // couldnt find or delete id
        if (!list) {
            return res.status(404).json({success: false});
        }
        // delete the children tasks too
        console.log(list.tasks)
        Task.deleteMany({_id: {$in: list.tasks}}, (err) => {
            if (err) { return err }
            res.json({success: true});
        });
    });
});

module.exports = router;
