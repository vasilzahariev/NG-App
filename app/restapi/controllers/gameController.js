const Game = require('../models/game');
const Activity = require('../models/activity');
const GameStatus = require('../models/gameStatus');
const { cloudinary } = require('../utils/cloudinary');

const addGame = async (req, res) => {
    const {
        name,
        description,
        posterFile,
        trailerUrl
    } = req.body;
    
    const posterUrl = await uploadPoster(posterFile);
    
    if (!posterUrl) return { error: 'An error occurred while uploading the image' };
    
    try {
        const game = new Game({
            name,
            description,
            posterUrl,
            trailerUrl
        });
        
        await game.save();

        return {
            success: true,
            _id: game._id
        };
    } catch (err) {
        if (err.message.includes('E11000') && err.message.includes('name')) {
            return {
                error: 'There is already a game with this name'
            }
        }
        
        return {
            error: err.message
        }
    }
}

const uploadPoster = async (file) => {
    try {
        const uploadedResponse = await cloudinary.uploader.upload(file, {
            upload_preset: 'dev_setups'
        });
        
        return uploadedResponse.url;
    } catch (error) {
        console.log(error);
        
        return '';
    }
}

const getGames = async () => {
    return await Game.find().sort('-created_at');
}

const getGame = async (id) => {
    return await Game.findById(id);
}

const addActivity = async (req, res) => {
    const {
        userId,
        gameId,
        status
    } = req.body;

    const statusNum = Number(status);

    try {
        const activity = new Activity({
            userId,
            gameId,
            status: statusNum,
            message: getStatusMessage(statusNum),
            date: Date.now()
        });

        addOrUpdateGameStatus(userId, gameId, statusNum);

        await activity.save();
    } catch (error) {
        return {
            error: error
        }
    }

    return {
        success: true
    }
}

const getStatusMessage = status => {
    switch (status) {
        case 0: return '';
        case 1: return 'wants to play';
        case 2: return 'is playing';
        case 3: return 'has finshed';
        case 4: return 'has abondanded';
        default:
            throw Error;
    }
}

const addOrUpdateGameStatus = async (userId, gameId, status) => {
    const gStatus = await GameStatus.findOne({ userId, gameId} );

    if (!gStatus) {
        const gameStatus = new GameStatus({
            userId,
            gameId,
            status
        });

        await gameStatus.save();
    } else {
        await GameStatus.findOneAndUpdate({
            userId,
            gameId
        }, {
            status: status
        })
    }
}

module.exports = {
    addGame,
    getGames,
    getGame,
    addActivity
}
