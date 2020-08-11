const express = require('express');
const router = express();
const {
    register,
    login
} = require('../controllers/userController');

router.post('/register', async (req, res) => {
    const result = await register(req, res);

    res.send(result);
})

router.post('/login', async (req, res) => {
    const result = await login(req, res);

    res.send(result);
})

module.exports = router;
