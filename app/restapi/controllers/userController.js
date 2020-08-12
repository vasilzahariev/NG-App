const env = process.env.NODE_ENV || "development"

const mongoose = require('mongoose');
const config = require('../config/config')[env];
const bcrypt = require('bcrypt');
const User = require('../models/user');
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

module.exports = {
    register,
    login,
    verifyToken
}
