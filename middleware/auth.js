const JWT = require("jsonwebtoken");

const { JET_SECRET } = require("../lib/jwt");

const Authentic = async (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }
    try {
        const decoded = JWT.verify(token, JET_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid token",
        });
    }
};

module.exports = Authentic;