const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    phone_number: {
        type: Number
    },
    role: {
        type: String
    },
    passowrd: {
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model.user || mongoose.model("user", Userschema);

module.exports = User