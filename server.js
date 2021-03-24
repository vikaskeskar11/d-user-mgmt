const express = require('express')
const path = require('path')
const config = require('config')
const routes = require('./routes')
require('./db-connection/connection')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
global.isDevEnv = app.get('env') === 'development'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

routes.forEach((item) => {
    app.use(item.path, item.route)
})

app.set('port', config.server.port)
app.listen(() => {
    console.log('Listening on ', config.server.port)
})