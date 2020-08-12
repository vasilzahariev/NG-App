const express = require('express');
const router = express();
const {
    addGame,
    getGames
} = require('../controllers/gameController');

router.post('/addGame', async (req, res) => {
    const result = await addGame(req, res);

    res.send(result);
})

router.get('/getGames', async (req, res) => {
    const result = await getGames();

    res.send(result);
});

module.exports = router;
