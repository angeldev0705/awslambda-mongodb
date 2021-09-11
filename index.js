const express = require("express");
const bodyParser = require('body-parser')
const Cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// services
const routes = require("./routes");

app.set('view engine', 'ejs');
app.set("views", "views");
app.use(Cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);


// index page
app.get('/', function (req, res) {
    res.render('index');
});

// index page
app.get('/login', function (req, res) {
    res.render('login');
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


app.listen(PORT, () => {
    console.log(`server runing: ${PORT}`)
})