var express = require('express');
var router = express.Router();
const localStorage = require("localStorage")
const JWT = require("jsonwebtoken")

const { JWTPEIVATEKEY } = require('./lib/jwt');
var Auth = require('./routes/AuthRouter');


const checkLoginuser = (req, res, next) => {
    try {
        let token = localStorage.getItem("token")
        let decoded = JWT.verify(token, JWTPEIVATEKEY)
    }
    catch (error) {
        res.redirect("/login")
    }
    next();
}

// index page
router.get('/', checkLoginuser, function (req, res) {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    res.render('index', { email: email });
});

// signup route
router.get('/signup', function (req, res) {
    res.render('signup');
});

router.post('/signup', Auth.signup);

//login route
router.get('/login', async (req, res, next) => {
    res.render('login', { msg: '' });
});

router.post('/login', Auth.login);

router.post('/resetpassword', Auth.resetPassword);

// reset password
router.get('/resetpassword', function (req, res) {
    res.render('resetpassword');
});

// forgot password
router.get('/forgotpassword', function (req, res) {
    res.render('forgotpassword');
});

router.post('/logout', function (req, res) {
    localStorage.clear();
    res.redirect('/login');
});

module.exports = router;