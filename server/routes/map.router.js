const express = require('express');
const { Map, MapSchema } = require('../models/map.model');
const fs = require('fs');
const {MapUploadError} = require("../middleware/error.middleware");

const router = express.Router();

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', async (req, res, next) => {
    // Get all maps
    res.send(await Map.find({user: req.user._id}));
})

router.post('/', upload.single('file'), async (req, res, next) => {
    // Create a new map with mongose model, get the _id and save the file with _id as name
    // req is a multipart/form-data cointaining map file and map name

    const { name } = req.body

    const map = new Map({
        name: name,
        user: req.user._id
    });

    try {
        await map.save();
    } catch (err) {
        console.log(err);

        next(new MapUploadError("Database Error"));
    }

    try {
        // Create directory if not exists
        if (!fs.existsSync('../maps')) {
            fs.mkdirSync('../maps');
        }
        fs.writeFileSync(`../maps/${map._id}`, req.file.buffer);

        res.send(map);
    } catch (err) {
        console.log(err);

        await map.deleteOne();

        next(new MapUploadError("Map save error"));
    }
})

router.put('/:id', async (req, res, next) => {
    // Update map name, offset, size
    await Map.findOneAndUpdate({_id: req.params.id, user: req.user._id}, req.body);
    const map = await Map.findOne({_id: req.params.id, user: req.user._id});
    res.send(map);
})

router.delete('/:id', async (req, res, next) => {
    // Delete map
    const map = await Map.findOneAndDelete({_id: req.params.id, user: req.user._id});

    // Delete file
    try {
        fs.unlinkSync(`../maps/${map._id}`);
    } catch (err) {
        console.log(err);
        // next(new MapUploadError("Map delete error"));
    }

    res.send(map);
})

module.exports = router