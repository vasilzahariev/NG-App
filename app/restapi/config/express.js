const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = app => {
    app.use(cookieParser());

    app.use(express.json());
    app.use(express.urlencoded());

    app.use(express.static('static'));
}
