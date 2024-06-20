const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const userId = req.auth.payload.sub;

    res.send('UserRouter works user id: ' + userId);
})

module.exports = router