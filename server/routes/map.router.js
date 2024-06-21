const express = require('express');
const { Map, MapSchema } = require('../models/map.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    // Get all maps
    res.send(await Map.find({user: req.user._id}));
})

router.post('/', async (req, res, next) => {
    // Create a new map, get the _id and save the file with _id as name

})

router.put('/:id', async (req, res, next) => {
    // Update map name, offset, size
    const map = await Map.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body);
    res.send(map);
})

router.delete('/:id', async (req, res, next) => {
    // Delete map
    const map = await Map.findOneAndDelete({_id: req.params.id, user: req.user._id});
    res.send(map);
})

module.exports = router