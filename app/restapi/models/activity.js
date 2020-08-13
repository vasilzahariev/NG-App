const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
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
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Activity', ActivitySchema);
