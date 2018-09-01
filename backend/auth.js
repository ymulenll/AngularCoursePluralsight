var User = require('./models/User.js')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple')
var express = require('express')
var router = express.Router()

router.post('/register', (req, res) => {
    var userData = req.body;

    var user = new User(userData)

    user.save((error, newUser) => {
        if (error)
            return res.status(500).send({ message: 'Error saving user' })

        createSendToken(res, newUser)
    })
})

router.post('/login', async (req, res) => {
    var loginData = req.body;

    var user = await User.findOne({ email: loginData.email })

    if (!user) {
        res.status(401).send({ message: 'Email or passoword invalid' })
    }
    bcrypt.compare(loginData.password, user.password, (error, isMatch) => {
        if (!isMatch)
            return res.status(401).send({ message: 'Password mismatch' })

        createSendToken(res, user)
    })
})

function createSendToken(res, user) {
    var payload = { subject: user._id }
    var token = jwt.encode(payload, '123')

    res.status(200).send({ token })
}

var auth = {
    router,
    checkAuthenticated: (req, res, next) => {
        if (!req.header('authorization')) {
            return res.status(401).send({ message: 'Unauthorized. Missing auth header' })
        }

        var token = req.header('authorization').split(' ')[1]

        var payload = jwt.decode(token, '123')

        if (!payload) {
            return res.status(401).send({ message: 'Unauthorized. Auth header invalid' })
        }

        req.userId = payload.subject

        next()
    }
}

module.exports = auth