const express = require('express');
const { Project, ProjectSchema } = require('../models/project.model');
const {Parameters} = require("../models/parameters.model");

const router = express.Router();

router.get('/', async (req, res, next) => {
    // Return all projects
    const projects = await Project.find({ user: req.user._id }).populate('parameters');
    res.send(projects);
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
    const project = await Project.findOne({ _id: req.params.id, user: req.user._id }).populate('parameters');
    res.send(project);
});

router.delete('/:id', async (req, res, next) => {
    // Delete a project
    const project = await Project.findOneAndDelete({_id: req.params.id, user: req.user._id});
    // Delete parameters
    await Parameters.findByIdAndDelete(project.parameters);
    res.send(await project.populate('parameters'));
});

router.put('/:id', async (req, res, next) => {
    // Update a project
    const project = await Project.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true }
    ).populate('parameters');
    res.send(project);
});

router.put('/:id/lastOpenAt', async (req, res, next) => {
    // Update a project's last opened date
    const project = await Project.findOne({_id: req.params.id, user: req.user._id});
    if(req.body.lastOpenAt) {
        project.lastOpenAt = new Date(req.body.lastOpenAt);
    } else {
        project.lastOpenAt = new Date();
    }

    await project.save();
    res.send(await project.populate('parameters'));
})

router.put('/:id/parameters', async (req, res, next) => {
    // Update a project's parameters
    const project = await Project.findOne({_id: req.params.id, user: req.user._id});
    const parameters = await Parameters.findByIdAndUpdate(project.parameters, req.body);
    await parameters.save();
    res.send(await project.populate('parameters'));
})

module.exports = router