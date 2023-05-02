const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { password, username } = req.body;
    if (!password || !username) {
        res.sendStatus(400);
        return;
    }
    res.send({ userId: 0 });
});

module.exports = router;
