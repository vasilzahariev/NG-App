const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

module.exports = app => {
    app.use(cors());

    app.use(cookieParser());

    app.use(express.json());
    app.use(express.urlencoded());

    app.use(express.static('static'));
}
