const express = require('express');
const router = express.Router();
const { Project, ProjectSchema } = require('../models/Project');

router.get('/', (req, res, next) => {
    console.log(Project);
    res.send('ProjectRouter works');
})

module.exports = router