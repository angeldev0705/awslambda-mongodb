require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser')
const Cors = require("cors");
const mongoose = require("mongoose")
const app = express();
const PORT = process.env.PORT || 5000;

// services
const routes = require("./routes");

//mongodb connectivity
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
    console.log("mongodb to connect");
});
mongoose.connection.on("error", (error) => {
    console.log("error :", error);
});

app.set('view engine', 'ejs');
app.set("views", "views");
app.use(Cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`server runing: ${PORT}`)
})