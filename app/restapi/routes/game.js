const express = require('express');
const router = express();
const {
    addGame,
    getGames,
    getGame,
    addActivity,
    getGameStatus,
    getAllUserStatuses,
    getUserActivity,
    getUserGamesWithStatus,
    addReview,
    getReviews
} = require('../controllers/gameController');

router.post('/addGame', async (req, res) => {
    const result = await addGame(req, res);

    res.send(result);
});

router.post('/getGames', async (req, res) => {
    const userId = req.body.userId;
    const games = await getGames();

    if (userId) {
        const statuses = await getAllUserStatuses(userId);

        res.send({
            games,
            statuses
        });

        return;
    }

    res.send({ games });
});

router.post('/getGame', async (req, res) => {
    const gameId = req.body.gameId;
    const userId = req.body.userId;

    try {
        const game = await getGame(gameId);

        const status = await getGameStatus(userId, gameId);

        res.status(200).send({
            game,
            status: status ? status.status : 0
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({ error: 'No game found' });
    }
});

router.post('/addActivity/:gameId', async (req, res) => {
    const result = await addActivity(req, res);

    res.send(result);
})

router.post('/getUserActivity', async (req, res) => {
    const userId = req.body.userId;
    const result = await getUserActivity(userId);

    res.send(result);
})

router.get('/g/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const game = await getGame(gameId);
    
    res.send(game);
})

router.post('/userGamesWithStatus', async (req, res) => {
    const result = await getUserGamesWithStatus(req, res);

    res.send({ games: result })
})

router.post('/addReview', async (req, res) => {
    const result = await addReview(req, res);

    res.send(result)
})

router.get('/getReviews', async (req, res) => {
    const result = await getReviews();

    res.send({ reviews: result });
})

module.exports = router;
