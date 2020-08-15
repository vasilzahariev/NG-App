const Game = require('../models/game');
const Activity = require('../models/activity');
const GameStatus = require('../models/gameStatus');
const GameReview = require('../models/gameReview');
const Following = require('../models/following');
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
    return await Game.find().sort();
}

const getGame = async (id) => {
    return await Game.findById(id);
}

const getGameStatus = async (userId, gameId) => {
    try {
        const result = await GameStatus.findOne({ userId, gameId });
        return result;
    } catch (error) {
        return undefined;
    }
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

        const result = await addOrUpdateGameStatus(userId, gameId, statusNum);

        if (!result) return {
            success: true
        };

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
        case 0: return 'removed';
        case 1: return 'wants to play';
        case 2: return 'is playing';
        case 3: return 'has finshed';
        case 4: return 'has abondanded';
        default:
            throw Error;
    }
}

const addOrUpdateGameStatus = async (userId, gameId, status) => {
    const gStatus = await GameStatus.findOne({ userId, gameId });

    if (!gStatus) {
        const gameStatus = new GameStatus({
            userId,
            gameId,
            status
        });

        await gameStatus.save();
    } else {

        if (gStatus.status === status) { return false; }

        await GameStatus.findOneAndUpdate({
            userId,
            gameId
        }, {
            status: status
        })
    }

    return true;
}

const getAllUserStatuses = async (userId) => {
    return await GameStatus.find({ userId })
}

const getUserActivity = async (userId) => {
    return await Activity.find({ userId });
}

const getUserGamesWithStatus = async (req, res) => {
    const {
        userId,
        status
    } = req.body;

    const gameIds = await getGameIds(userId, status);
    const games = await getGamesWithIds(gameIds);

    return games;
}

const getGameIds = async (userId, status) => {
    return await (await GameStatus.find({ userId, status })).map(gs => gs.gameId);
}

const getGamesWithIds = async (gameIds) => {
    return await (await Game.find()).filter(g => {
        for (const id of gameIds) {
            if (g._id.equals(id)) return g;
        }
    });
}

const addReview = async (req, res) => {
    const {
        review,
        score,
        userId,
        gameId
    } = req.body;

    try {
        const gameReview = new GameReview({
            review,
            score,
            userId,
            gameId
        });

        const reviewObj = await gameReview.save();

        return { reviewId: reviewObj._id };
    } catch(err) {
        console.log(err.message);

        return {err: err.message};
    }
}

const getReviews = async () => {
    return await GameReview.find();
}

const getReview = async (reviewId) => {
    return await GameReview.findById(reviewId);
}

const getGameReviews = async (gameId) => {
    return await GameReview.find({ gameId });
}

const getFollowingIds = async (userId) => {
    return await (await Following.find({ userId })).map(f => f.followsId);
}

const getActivity = async (userId) => {
    const followingIds = await getFollowingIds(userId);

    return await Activity.find({
        $or: [
            {userId: userId},
            {userId: followingIds}
        ]
    })
}

module.exports = {
    addGame,
    getGames,
    getGame,
    addActivity,
    getGameStatus,
    getAllUserStatuses,
    getUserActivity,
    getUserGamesWithStatus,
    addReview,
    getReviews,
    getReview,
    getGameReviews,
    getGamesWithIds,
    getFollowingIds,
    getActivity
}
