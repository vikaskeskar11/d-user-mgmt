const mongoose = require('mongoose')
const config = require('config')

class Connection {
    async connect() {
        console.log('Connection:connect: Making connection with DB ')
        const user = config.db.user
        const password = config.db.password
        const host = config.db.host
        const port = config.db.port
        const name = config.db.name
        let url = `mongodb://${host}:${port}/${name}?authSource=admin`
        if (user && password) {
            url = `mongodb://${user}:${password}@${host}:${port}/${name}?authSource=admin`
        }
        mongoose.connect(url, {
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        mongoose.connection.on('error', function () {
            console.log('Could not connect to MongoDB')
        })
        mongoose.connection.on('disconnected', function () {
            console.log('Lost MongoDB connection!')
        })
        mongoose.connection.on('connected', function () {
            console.log('Connection established to MongoDB')
        })
        mongoose.connection.on('reconnected', function () {
            console.log('Reconnected to MongoDB')
        })
    }
}

module.exports = new Connection().connect()