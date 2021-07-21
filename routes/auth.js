const router = require('express').Router();

const User = require('../models/User');

const passport = require('../config/passport')
const jwt = require('jsonwebtoken');

const { signupPost, logoutGet } = require('../controllers/authControllers')

router.get('/', (req, res) => res.status(200).json({ ok: true, msg: 'Working' }));

router.post('/signup', signupPost);

router.post('/login', passport.authenticate('local'), async(req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id);
    const token = jwt.sign({ user }, process.env.JWTSECRET, { expiresIn: process.env.JWTEXPIRESIN })
    res.status(200).json({ ok: true, user, token });
});

router.get('/logout', logoutGet)

module.exports = router;