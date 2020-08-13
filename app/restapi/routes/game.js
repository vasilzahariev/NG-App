const express = require('express');
const router = express();
const {
    addGame,
    getGames,
    getGame,
    addActivity
} = require('../controllers/gameController');

router.post('/addGame', async (req, res) => {
    const result = await addGame(req, res);

    res.send(result);
});

router.get('/getGames', async (req, res) => {
    const result = await getGames();

    res.send(result);
});

router.get('/g/:gameId', async (req, res) => {
    const id = req.params.gameId;

    try {
        const game = await getGame(id);

        res.status(200).send({ game });
    } catch (error) {

        res.status(500).send({ error: 'No game found' });
    }
});

router.post('/addActivity/:gameId', async (req, res) => {
    const result = await addActivity(req, res);

    res.send(result);
})

module.exports = router;
