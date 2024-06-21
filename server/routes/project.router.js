const express = require('express');
const { Project, ProjectSchema } = require('../models/project.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    // Return all projects
    res.send(await Project.find({user: req.user._id}));
})

router.post('/', async (req, res, next) => {
    // Create a new project
    const project = new Project(req.body);
    project.user = req.user._id;
    await project.save();
    res.send(project);
});

router.get('/:id', async (req, res, next) => {
    // Return a project by id
    res.send(await Project.findOne({_id: req.params.id, user: req.user._id}));
});

router.delete('/:id', async (req, res, next) => {
    // Delete a project
    const project = await Project.findOneAndDelete({_id: req.params.id, user: req.user._id});
    res.send(project);
});

router.put('/:id', async (req, res, next) => {
    // Update a project
    const project = await Project.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body);
    res.send(project);
});

module.exports = router