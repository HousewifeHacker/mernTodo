const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
});

UserSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
