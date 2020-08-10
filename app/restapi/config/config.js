module.exports = {
    'development': {
        PORT: process.env.PORT || 9999,
        databaseUrl: `mongodb+srv://User:${process.env.DB_PASSWORD}@ngapp.5qrqh.azure.mongodb.net/ngapp?retryWrites=true&w=majority`
    },
    'production': {}
}