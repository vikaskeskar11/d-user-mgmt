const express = require('express')
const router = express.Router()
const userService = require('../services/userService')

router.post('/login', async (req, res) => {
    try {
        console.log('userRoutes: Checking credentials')
        const user = await userService.login(req.body)
        res.status(200).send(user)
    } catch (error) {
        handleError(req, res, error)
    }
})

router.post('', async (req, res) => {
    try {
        console.log('userRoutes: Adding user ')
        const user = await userService.add(req.body, req.user)
        res.send({ status: true, user: user })
    } catch (error) {
        handleError(req, res, error)
    }
})

function handleError(req, res, error) {
    console.error('userRoutes ', { path: req.path, error })
    res.status(403).send({ err: error.message })
}

module.exports = router