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

app.get('/', (req, res) => {
    res.status(200).send('Hello there!');
})

app.listen(config.PORT, console.log(`Listening on port: ${config.PORT}`));
