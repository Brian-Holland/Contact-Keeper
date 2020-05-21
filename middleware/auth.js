const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
    //grab token from header
    const token = req.header("x-auth-token");

    //check if token doesnt exist
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        //match the user from the request to the token payload user
        const decoded = jwt.verify(token, config.get("jwtsecret"));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};
