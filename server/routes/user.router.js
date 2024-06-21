const express = require('express');
const User = require('../models/user.model');

const router = express.Router();

router.get('/', (req, res) => {
    // Get user's information
    res.send(req.user);
})

router.put('/', async (req, res) => {
    // Modify user's nickname
    const user = req.user;
    const { nickname } = req.body;
    user.nickname = nickname;
    await user.save();
});

module.exports = router