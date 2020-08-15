const express = require('express');
const router = express();
const {
    register,
    login,
    verifyToken,
    getUser,
    getUserReviews
} = require('../controllers/userController');
const {
    getUserActivity,
    getGamesWithIds
} = require('../controllers/gameController');

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
});

router.get('/u/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await getUser(userId);
        const activity = await (await getUserActivity(userId)).reverse().slice(0, 6);
        const gameIds = activity.map(a => a.gameId);
        const games = await getGamesWithIds(gameIds);
        const reviews = await (await getUserReviews(userId)).reverse().slice(0, 4);

        res.send({
            user,
            activity,
            games,
            reviews
        });
    } catch (error) {
        console.log(error.message);

        res.send({
            err: error.message
        })
    }
})

module.exports = router;
