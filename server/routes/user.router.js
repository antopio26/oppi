const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('UserRouter works');
})

module.exports = router