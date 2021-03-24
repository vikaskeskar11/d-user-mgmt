const mongoose = require('mongoose')
const config = require('config')

class Connection {
    async connect() {
        try {
            console.log('Connection:connect: Making connection with DB ')
            const user = config.db.user
            const password = config.db.password
            const host = config.db.host
            const port = config.db.port
            if (user && password) {
                await mongoose
                    .connect(`mongodb://${user}:${password}@${host}:${port}/admin`)
            } else {
                await mongoose
                    .connect(`mongodb://${host}:${port}/admin`)
            }
            console.log('Connection:connect: Connected to DB ')
        } catch (error) {
            console.log('Connection:connect: Error ', { message: error.message })
            // If failed to connect, retry after some time
            setTimeout(() => {
                this.connect()
            }, 5000)
        }
    }
}

module.exports = new Connection().connect()