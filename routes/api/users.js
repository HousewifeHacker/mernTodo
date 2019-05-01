const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

router.post('/', (req, res, next) => {
    let {email, password} = req.body;

    if (!email || !password) {
        return res.send({
            success: false,
            message: "Email and password are required",
        });
    }
    if (password.length<6) {
        return res.send({
            success: false,
            message: "Password must be a minimum of 6 characters."
        })
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
        } else {
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
                // sign them in
                const newUserSession = new UserSession({
                    userId: user._id
                });
                newUserSession.save((err, session) => {
                    if (err || !session ) {
                        return res.send({
                            success: false,
                            message: 'Server Error starting session',
                        });
                    }
                    return res.send({
                        success: true,
                        token: session._id
                    });
                })
            });
        }
    });
});


module.exports = router;
