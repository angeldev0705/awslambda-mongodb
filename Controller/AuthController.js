const AmazonCognitoIdenstity = require('amazon-cognito-identity-js');
const config = require("../config/config");
const JWT = require("jsonwebtoken");
const Bcrypt = require('bcryptjs');
const localStorage = require("localStorage")
const { JWTPEIVATEKEY } = require("../lib/jwt");
const UserModel = require("../model/Auth");

const poolData = {
    UserPoolId: config.userPoolId,
    ClientId: config.clientId
};
const userPool = new AmazonCognitoIdenstity.CognitoUserPool(poolData);

const Signup = async (body, callback) => {
    var firstname = body.firstname;
    var lastname = body.lastname;
    var email = body.email;
    var username = body.username;
    var role = body.role;
    var phone_number = body.phone_number;
    var password = body.password;
    var attributeList = [];

    var dataEmail = {
        Name: 'email',
        Value: email
    };
    var dataPhoneNumber = {
        Name: 'phone_number',
        Value: phone_number
    };
    var attributeEmail = new AmazonCognitoIdenstity.CognitoUserAttribute(dataEmail);
    var attributePhoneNumber = new AmazonCognitoIdenstity.CognitoUserAttribute(dataPhoneNumber);

    attributeList.push(attributeEmail);
    attributeList.push(attributePhoneNumber);
    let passwordHash = await Bcrypt.hash(password, 8);
    const userData = await new UserModel({
        firstname: firstname,
        lastname: lastname,
        fullname: firstname + ' ' + lastname,
        email: email,
        username: username,
        role: role,
        phone_number: phone_number,
        password: passwordHash
    })
    await userData.save();
    userPool.signUp(email, password, attributeList, null, async (err, result) => {
        if (err) {
            return callback(err, null)
        }
        else {
            return callback(null, result)

        }
    });
}

const Login = async (body, callback) => {
    var userName = body.email;
    var password = body.password;
    var authenticationDetails = new AmazonCognitoIdenstity.AuthenticationDetails({
        Username: userName,
        Password: password
    });
    var userData = {
        Username: userName,
        Pool: userPool
    }
    var cognitoUser = new AmazonCognitoIdenstity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: async (result) => {
            const token = await JWT.sign({ userName: userName }, JWTPEIVATEKEY, {
                expiresIn: "24h"
            })
            let data = {
                token: token,
                email: userName
            }
            localStorage.setItem("email", userName)
            localStorage.setItem("token", token)
            return callback(null, data)
        },
        onFailure: (async (error) => {
            return callback(error, null)
        })
    })
};

const ResetPassword = (body, callback) => {
    const username = body.username
    cognitoUser = new AmazonCognitoIdenstity.CognitoUser({
        Username: username,
        Pool: userPool
    });

    cognitoUser.forgotPassword({
        onSuccess: function (result) {
            return callback(null, result)
        },
        onFailure: function (error) {
            return callback(error, null)
        },
        inputVerificationCode() {
            var verificationCode = prompt('Please input verification code ', '');
            var newPassword = prompt('Enter new password ', '');
            cognitoUser.confirmPassword(verificationCode, newPassword, this);
        }
    });
}

module.exports = {
    Signup,
    Login,
    ResetPassword
}