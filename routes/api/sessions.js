const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

// verify a token
router.get('/:id', (req, res) => {
    const token = req.params.id;
    UserSession.find({
        _id: token,
    }, (err, sessions) => {
        if (err || sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error finding token.'
            });
        }
        return res.send({
            success: true,
            message: 'Success',
            user: sessions[0].userId,
        });
    });
});

router.post('/', (req, res) => {
    let {email, password} = req.body;
    email = email.toLowerCase().trim();

    if (!email || !password) {
        return res.send({
            success: false,
            message: 'Email and password required.'
        });
    }

    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server Error',
            })
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Invalid User',
            })
        }
        const user = users[0];
        // validate with bcrypt method defined in schema
        if (!user.validatePassword(password)) {
            return res.send({
                success: false,
                message: 'Invalid Password',
            });
        }
        const newUserSession = new UserSession({
            userId: user._id,
        });
        newUserSession.save((err, session) => {
            if (err || !session ){
                return res.send({
                    success: false,
                    message: 'Server Error',
                });
            }
            return res.send({
                success: true,
                token: session._id,
            });
        });
    });
});

router.delete('/:id', (req, res) => {
    const sessionId = req.params.id;
    UserSession.findByIdAndRemove(
        sessionId,
        (err, doc) => {
            if (err || !doc) {
                return res.send({
                    success: false,
                    message: 'Server Error',
                });
            }
            return res.send({
                success: true,
                message: 'Logged Out',
            });
        }
    );
});

module.exports = router;
