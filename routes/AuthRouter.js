const authService = require('../Controller/AuthController');

const signup = async (req, res) => {
    await authService.Signup(req.body, (error, response) => {
        console.log("error", error)
        if (error) {
            return res.send({
                status: 400,
                message: "Not Done",
                error: error
            });
        }
        else {
            // return res.send({
            //     status: 200,
            //     message: "you have successfully signup in!",
            //     data: response
            // });
            res.render('login', { 'studentlist': response });
        }
    })
}

const login = async (req, res, next) => {
    const userName = req.body.email;
    const password = req.body.password;
    if (!userName) {
        return res.render("login", { msg: "Email is required" })
    }
    if (!password) {
        return res.render("login", { msg: "Password is required" })
    }
    await authService.Login(req.body, (error, response) => {
        if (error) {
            return res.send({
                status: 400,
                message: "Not Done",
                error: error
            });
        }
        else {
            return res.redirect("/")
        }
    })
}

const resetPassword = async (req, res) => {
    await authService.ResetPassword(req.body, (error, response) => {
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
                message: "You have successfully reset password",
                data: response
            });
        }
    })
}


module.exports = {
    login,
    signup,
    resetPassword
}