const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middleware/auth");

const User = require("../models/User");

//Router    GET api/auth
//Descr     Get logged in user
//Access    Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Router    POST api/auth
//Descr     Auth user and get token
//Access    Public
router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            //if no email for user exists, send message
            if (!user) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }
            //check if passwords match
            const isMatch = await bcrypt.compare(password, user.password);
            //if passwords dont match, send message
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }
            //create object to send in webtoken
            const payload = {
                user: {
                    id: user.id,
                },
            };

            //sign webtoken using jwtsecret from confog file
            jwt.sign(
                payload,
                config.get("jwtsecret"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
