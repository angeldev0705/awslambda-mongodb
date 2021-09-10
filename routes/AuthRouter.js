// const express = require("express");
// const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
// const router = express.Router();

// const Config = require("../config/config")

// const poolData = {
//     UserPoolId: Config.userPoolId,
//     ClientId: Config.clientId
// }

// // const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// router.post("/signup", (req, res) => {
//     // const firstname = req.body.firstname;
//     // const lastname = req.body.lastname;
//     const email = req.body.email;
//     const password = req.body.password;
//     const confirmpassword = req.body.confirmpassword;
//     const phone_number = req.body.phone_number;

//     // if (password !== confirmpassword) {
//     //     return res.redirect('/signup?=error=passwords')
//     // }
//     // const emailData = {
//     //     Name: "email",
//     //     Value: email
//     // };
//     // const emailAttribute = new AmazonCognitoIdentity.CognitoUserAttribute(emailData);

//     // userPool.signUp(email, password, phone_number, [emailAttribute], null, (err, data) => {
//     //     if (err) {
//     //         return console.error(err);
//     //     }
//     //     res.send(data.user)
//     // })
//     var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

//     var attributeList = [];

//     var dataEmail = {
//         Name: 'email',
//         Value: email
//     };

//     var dataPhoneNumber = {
//         Name: 'phone_number',
//         Value: phone_number
//     };
//     var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
//     var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
//         dataPhoneNumber
//     );

//     attributeList.push(attributeEmail);
//     attributeList.push(attributePhoneNumber);

//     userPool.signUp(email, password, phone_number, attributeList, null, function (
//         err,
//         result
//     ) {
//         if (err) {
//             console.log("error", err)
//         }
//         // var cognitoUser = result?.user;
//         console.log('user name is ' + result);
//     });
// })


// router.post("/login", (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;
// })

// module.exports = router;

// // var poolData = {
// //     UserPoolId: '...', // Your user pool id here
// //     ClientId: '...', // Your client id here
// // };


var authService = require('../Controller/AuthController');
exports.signup = async (req, res) => {
    console.log("Hello world", req.body)
    await authService.Signup(req.body, (error, response) => {
        if (error) {
            return res.send({
                status: 400,
                message: "Not Done",
                error: error
            });
        }
        else {
            return res.send({
                status: 200,
                message: "you have successfully Signup",
                data: result
            });
        }
    })
}

exports.login = async (req, res) => {
    await authService.Login(req.body, (error, response) => {
        if (error) {
            return res.send({
                status: 400,
                message: "Not Done",
                error: error
            });
        }
        else {
            return res.send({
                status: 200,
                message: "you have successfully Login",
                data: result
            });
        }
    })
}