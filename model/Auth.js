const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    phone_number: {
        type: String
    }
});

const User = mongoose.model("user", Userschema);

module.exports = User