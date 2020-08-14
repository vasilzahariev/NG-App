const express = require('express');
const router = express();
const {
    register,
    login,
    verifyToken,
    getUser
} = require('../controllers/userController');

router.post('/register', async (req, res) => {
    const result = await register(req, res);

    res.send(result);
})

router.post('/login', async (req, res) => {
    const result = await login(req, res);

    res.send(result);
})

router.get('/verifyToken', async (req, res) => {
    const result = await verifyToken(req, res);

    res.send(result);
})

router.get('/username/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const result = await getUser(userId);

        res.send({ username: result.username });
    } catch (error) {
        res.send({});
    }
})

module.exports = router;
