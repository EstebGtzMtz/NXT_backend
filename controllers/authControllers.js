const User = require('../models/User');

exports.signupPost = async(req, res) => {
    const { name, email, password } = req.body;

    User.register({ name, email }, password, (err, user) => {
        if (err) return res.status(200).json({ ok: false, err })

        res.status(200).json({ ok: true, user });
    });
}

exports.logoutGet = (req, res) => {
    req.logout();
    res.status(200).json({ ok: true, msg: 'Logged out' });
}