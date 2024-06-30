const express = require('express');
const Path = require('../models/path.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    // Return all paths
    const paths = await Path.find({ project: req.project._id });
    res.send(paths);
})

router.get('/saved', async (req, res, next) => {
    // Return all saved paths
    const paths = await Path.find({ project: req.project._id, saved: true });
    res.send(paths);
})

router.get('/:id', async (req, res, next) => {
    // Return a path by id
    const path = await Path.findOne({ _id: req.params.id, project: req.project._id });
    res.send(path);
})

router.post('/', async (req, res, next) => {
    // Create a new path
    const path = new Path(req.body);
    path.project = req.project._id;
    await path.save();
    res.send(path);
})

router.put('/:id', async (req, res, next) => {
    // Update a path
    const path = await Path.findOneAndUpdate(
        { _id: req.params.id, project: req.project._id },
        req.body,
        { new: true }
    );
    res.send(path);
})

router.put('/:id/save', async (req, res, next) => {
    // Save a path
    const path = await Path.findOneAndUpdate(
        { _id: req.params.id, project: req.project._id },
        { saved: true },
        { new: true }
    );
    res.send(path);
})

router.put('/:id/unsave', async (req, res, next) => {
    // Unsave a path
    const path = await Path.findOneAndUpdate(
        { _id: req.params.id, project: req.project._id },
        { saved: false },
        { new: true }
    );
    res.send(path);
})

router.delete('/:id', async (req, res, next) => {
    // Delete a path
    const path = await Path.findOneAndDelete({ _id: req.params.id, project: req.project._id });
    res.send(path);
})

module.exports = router