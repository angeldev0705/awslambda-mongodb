const express = require("express");
const AmazoneCognitoIdentity = require("amazon-cognito-identity-js");
const router = express.Router();

const Config = require("../config/config")

const poolData = {
    UserPoolId: Config.userPoolId,
    ClientId: Config.clientId
}

const userPool = new AmazoneCognitoIdentity.CognitoUserPool(poolData);

router.post("/signup", async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (password !== confirmpassword) {
        return res.redirect('/signup?=error=passwords')
    }
    const emailData = {
        Name: "email",
        Value: email
    };
    const emailAttribute = new AmazoneCognitoIdentity.CognitoUserAttribute(emailData);
    await userPool.signUp(email, password, [emailAttribute], null, (error, data) => {
        if (error) {
            return console.error(error);
        }
        res.send(data.user)
    })
})

module.exports = router;