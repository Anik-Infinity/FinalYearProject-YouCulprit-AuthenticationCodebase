const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const print = console.log

// User Registration
router.post('/user-create', async (req, res) => {

    const user = new User(req.body)
    try {
        await user.save()
        //const token = await user.generateAuthToken()
        res.status(201).send({ message: 'Registration Completed. you can login now', error: '' })
        print(user)
    } catch (e) {
        res.status(400).send({ error: 'Something went wrong. Please try agnain later!' })
        print(e)
    }
})

// login user
router.post('/user-login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.phone, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token, error: '' })
    } catch (e) {
        res.status(400).send({ error: 'Something went wrong. Please try agnain later!' })
    }
})

// logout user
router.post('/user-logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send({ message: 'logout successfully' })
    } catch (e) {
        res.status(400).send({ error: 'Something went wrong. Please try agnain later!' })
    }
})

// Read user profile
router.get('/user-profile', auth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (e) {
        res.status(400).send({ error: 'Something went wrong. Please try agnain later!' })
    }
})

module.exports = router
