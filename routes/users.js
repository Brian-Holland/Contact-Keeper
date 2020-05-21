const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

//Route     POST api/users
//Desc      Register user
//Access    Public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            //attempt to find user in db by email
            let user = await User.findOne({ email });

            //if there is already a user...
            if (user) {
                //respond that user exists
                return res.status(400).json({ msg: "User already exists" });
            }

            //otherwise create instance of new user using the name,email,password
            user = new User({ name, email, password });

            //generate salt for the password encryption
            const salt = await bcrypt.genSalt(10);

            //hash the password using salt
            user.password = await bcrypt.hash(password, salt);

            //save user to db
            await user.save();

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
