const mongoose = require('mongoose');

const GameReviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    score: {
        type: Number
    },
    gameId: {
        type: 'ObjectId',
        ref: 'Game'
    },
    userId: {
        type: 'ObjectId',
        ref: 'User'
    }
});

module.exports = mongoose.model('GameReview', GameReviewSchema);
