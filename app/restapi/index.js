const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);

        throw err;
    }

    console.log('Database is setup and running!');
})

require('./config/express')(app);

app.get('/test', (req, res) => {
    console.log('test');
})

app.post('/test', (req, res) => {
    console.log(req.body);

    res.send({
        name: 'Pesho'
    })
})

app.listen(config.PORT, console.log(`Listening on port: ${config.PORT}`));
