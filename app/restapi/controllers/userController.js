const env = process.env.NODE_ENV || "development"

const mongoose = require('mongoose');
const config = require('../config/config')[env];
const bcrypt = require('bcrypt');
const User = require('../models/user');
const GameReview = require('../models/gameReview');
const Following = require('../models/following');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
    
        const userObj = await user.save();

        const token = createUserToken(userObj);

        return {
            cookie: token,
            user: userObj
        };
    } catch (e) {
        console.log(e.message);

        if (e.message.includes('E11000') && e.message.includes('username')) {
            return {
                error: 'Username is already used'
            }
        } else if (e.message.includes('E11000') && e.message.includes('email')) {
            return {
                error: 'Email is already used'
            }
        }

        return {
            error: e.message
        }
    }
}

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body;
    
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return {
                error: 'Invalid username'
            }
        }

        const hashedPassowrd = user.password;

        const status = await bcrypt.compare(password, hashedPassowrd);
        
        if (!status) return { error: 'Invalid password' };

        const token = createUserToken(user);

        return {
            cookie: token,
            user: user
        }
    } catch (e) {
        console.log(e.message);

        return {
            error: e.message
        }
    }
}

const verifyToken = async (req, res) => {
    const token = req.header('Authorization');

    try {
        const decodedObj = jwt.verify(token, config.privateKey);
        const user = await User.findById(decodedObj.userId);
        
        return {
            user: user
        }
    } catch (error) {
        console.log(error.message);

        return {
            error: 'Invalid token'
        }
    }
}

const createUserToken = (user) => {
    return jwt.sign({
        userId: user._id,
        username: user.username
    }, config.privateKey)
}

const getUser = async (userId) => {
    return await User.findById(userId);
}

const getUserReviews = async (userId) => {
    return await GameReview.find({ userId });
}

const follow = async (req, res) => {
    const {
        userId,
        followsId
    } = req.body;

    try {
        const following = new Following({
            userId,
            followsId
        });

        await following.save();

        return {};
    } catch (error) {
        console.log(error);

        return {error};
    }
}

const isFollowing = async (req, res) => {
    const {
        userId,
        followsId
    } = req.body;

    return await Following.find({ userId, followsId });
}

const unfollow = async (req, res) => {
    const {
        userId,
        followsId
    } = req.body;

    try {
        await Following.findOneAndDelete({ userId, followsId });

        return {};
    } catch (error) {
        console.log(error.message);

        return { error };
    }
}

const getFollowingCount = async (userId) => {
    return await (await Following.find({ userId })).length;
}

const getFollowersCount = async (userId) => {
    return await (await Following.find({ followsId: userId })).length;
}

const getUsers = async () => {
    return await User.find();
}

module.exports = {
    register,
    login,
    verifyToken,
    getUser,
    getUserReviews,
    follow,
    isFollowing,
    unfollow,
    getFollowingCount,
    getFollowersCount,
    getUsers
}
