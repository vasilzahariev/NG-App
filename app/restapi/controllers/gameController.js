const Game = require('../models/game');
const { cloudinary } = require('../utils/cloudinary')

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

module.exports = {
    addGame,
    getGames,
    getGame
}
