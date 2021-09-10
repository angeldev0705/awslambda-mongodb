const AmazonCognitoIdenstity = require('amazon-cognito-identity-js');
const config = require("../config/config")

const poolData = {
    UserPoolId: "us-east-2_mlKgTBiIL",
    ClientId: "6ie3i1srnkknrr349kabdh6dc4"
};
const userPool = new AmazonCognitoIdenstity.CognitoUserPool(poolData);

const Signup = (body, callback) => {
    var email = body.email;
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

    userPool.signUp(email, password, attributeList, null, function (err, result) {
        if (err) {
            return callback(err)
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

const Login = (body, callback) => {
    var userName = body.username;
    var password = body.password;
    var authenticationDetails = new AmazonCognitoIdenstity.AuthenticationDetails({
        Username: userName,
        Password: password
    });
    var userData = {
        Username: userName,
        Pool: userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accesstoken = result.getAccessToken().getJwtToken();
            callback(null, accesstoken);
        },
        onFailure: (function (err) {
            callback(err);
        })
    })
};

module.exports = {
    Signup, Login
}