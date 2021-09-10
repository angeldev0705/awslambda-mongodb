var express = require('express');
var router = express.Router();

var Auth = require('./routes/AuthRouter');

router.post('/signup', Auth.signup);

router.post('/login', Auth.login);

module.exports = router;