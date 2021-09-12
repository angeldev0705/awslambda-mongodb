const express = require("express");
const bodyParser = require('body-parser')
const Cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;


const AmazonCognitoIdenstity = require('amazon-cognito-identity-js');
const config = require("./config/config");

const poolData = {
    UserPoolId: config.userPoolId,
    ClientId: config.clientId
};
const userPool = new AmazonCognitoIdenstity.CognitoUserPool(poolData);


// services
const routes = require("./routes");

app.set('view engine', 'ejs');
app.set("views", "views");
app.use(Cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`server runing: ${PORT}`)
})