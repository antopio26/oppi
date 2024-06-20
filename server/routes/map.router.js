const express = require('express');
const router = express.Router();
const { Map, MapSchema } = require('../models/Map');

router.get('/', (req, res, next) => {
    console.log(Map);
    res.send('MapRouter works');
})

module.exports = router