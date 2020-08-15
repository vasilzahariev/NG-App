module.exports = {
    'development': {
        PORT: process.env.PORT || 9999,
        privateKey: 'NG-RESTAPI-PrivateKey',
        databaseUrl: `mongodb+srv://User:User123@ngapp.5qrqh.azure.mongodb.net/ngapp?retryWrites=true&w=majority`
    },
    'production': {}
}