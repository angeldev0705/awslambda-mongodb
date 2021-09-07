const express = require("express");
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator')
const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set("views", "views");

const urlencodedParser = bodyParser.urlencoded({ extended: false })


// index page
app.get('/', function (req, res) {
    res.render('index');
});

// signup page
app.get('/signup', function (req, res) {
    res.render('signup');
});

// reset password
app.get('/resetpassword', function (req, res) {
    res.render('resetpassword');
});

// forgot password
app.get('/forgotpassword', function (req, res) {
    res.render('forgotpassword');
});

app.post('/login', urlencodedParser, [
    check('email', 'Email is required')
        .isEmail()
        .normalizeEmail(),
    check('password', 'Password is required')
        .isEmail()
        .normalizeEmail()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array())
        const alert = errors.array()
        res.render('index', {
            alert
        })
    }
})

app.listen(PORT, () => {
    console.log(`server runing: ${PORT}`)
})