const mongoose = require('mongoose');

const FollowingSchema = new mongoose.Schema({
    userId: {
        type: 'ObjectId',
        ref: 'User'
    },
    followsId: {
        type: 'ObjectId',
        ref: 'User'
    }
});

module.exports = mongoose.model('Following', FollowingSchema);
