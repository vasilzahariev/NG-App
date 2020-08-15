const express = require('express');
const router = express();
const {
    register,
    login,
    verifyToken,
    getUser,
    getUserReviews,
    follow,
    isFollowing,
    unfollow,
    getFollowersCount,
    getFollowingCount,
    getUsers
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
        const following = await getFollowingCount(userId);
        const followers = await getFollowersCount(userId);

        res.send({
            user,
            activity,
            games,
            reviews,
            following,
            followers
        });
    } catch (error) {
        console.log(error.message);

        res.send({
            err: error.message
        })
    }
})

router.get('/u/:userId/reviews', async (req, res) => {
    const userId = req.params.userId;

    try {
        const reviews = await getUserReviews(userId);
        const username = await (await getUser(userId)).username;

        res.send({
            reviews,
            username
        })
    } catch (error) {
        console.log(error.message);

        res.send({ err: error.message })
    }
});

router.post('/follow', async (req, res) => {
    const result = await follow(req, res);

    res.send(result);
})

router.post('/isFollowing', async (req, res) => {
    try {
        const result = await isFollowing(req, res);

        res.send({ isFollowing: result.length !== 0 ? true : false});
    } catch (err) {
        console.log(err.message);

        res.send({ error: err.message });
    }
});

router.post('/unfollow', async (req, res) => {
    const result = await unfollow(req, res);
    
    res.send(result);
})

router.get('/getUsers/:searchVal', async (req, res) => {
    const search = req.params.searchVal;
    const users = await (await getUsers()).filter(u => {
        if (u.username.toLowerCase().includes(search.toLowerCase())) return u;
    });

    res.send({users})
})

module.exports = router;
