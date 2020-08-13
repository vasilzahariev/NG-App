const mongoose = require('mongoose');

const GameStatusSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        required: true,
        ref: 'User'
    },
    gameId: {
        type: 'ObjectId',
        required: true,
        ref: 'Game'
    },
    status: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('GameStatus', GameStatusSchema);
