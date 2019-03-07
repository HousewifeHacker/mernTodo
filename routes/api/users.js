const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../../models/User');

router.post('/', (req, res, next) => {
    let {email, password} = req.body;

    if (!email || !password) {
        return res.send({
            success: false,
            message: "Email and password are required",
        });
    }

    email = email.toLowerCase().trim();

    // error if email already exists
    User.find({ email: email}, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server Error',
            });
        } else if (users.length > 0) {
            return res.send({
                success: false,
                message: 'User already exists',
            });
        }
    });

    // save with a hashed password
    // static method defined on User Schema with bcrypt
    const newUser = new User({
        email: email,
        password: User.generateHash(password),
    });
    newUser.save((err, user) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server Error',
            });
        }
        return res.send({
            success: true,
            message: 'Signed Up',
        });
    });
});



module.exports = router;
