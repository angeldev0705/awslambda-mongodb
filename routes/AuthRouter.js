const authService = require('../Controller/AuthController');
const User = require('../model/Auth');

const signup = async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const username = req.body.username;
    const role = req.body.role;
    const phone_number = req.body.phone_number;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    if (!firstname) {
        return res.render("signup", { msg: 'Firstname is required' })
    }
    if (!lastname) {
        return res.render("signup", { msg: 'Lastname is required' })
    }
    if (!email) {
        return res.render("signup", { msg: 'Email is required' })
    }
    if (!username) {
        return res.render("signup", { msg: 'Username is required' })
    }
    if (!phone_number) {
        return res.render("signup", { msg: 'Phone number is required' })
    }
    if (!role) {
        return res.render("signup", { msg: 'role is required' })
    }
    if (!password) {
        return res.render("signup", { msg: 'Password is required' })
    }
    if (!confirmpassword) {
        return res.render("signup", { msg: 'Confirm password is required' })
    }
    if (password !== confirmpassword) {
        return res.render("signup", { msg: "Password Does't match" })
    }
    const emailExits = await User.findOne({ email: email });
    if (emailExits) {
        return res.render("signup", { msg: 'Email is already exit!' })
    }
    else {
        await authService.Signup(req.body, (error, response) => {
            if (error) {
                return res.send({
                    status: 400,
                    message: "Not Done",
                    error: error
                });
            }
            else {
                return res.redirect("/login")
            }
        })
    }
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