const authService = require('../Controller/AuthController');
const router = require('../routes');
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
            return res.send({
                status: 200,
                message: "you have successfully signup in!",
                data: response
            });
        }
    })
}

const login = async (req, res) => {
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
                message: "you have successfully logged in!",
                data: response
            });
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