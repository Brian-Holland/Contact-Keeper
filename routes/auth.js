const express = require("express");
const router = express.Router();

//Router    GET api/auth
//Descr     Get logged in user
//Access    Private
router.get("/", (req, res) => {
    res.send("Get logged in user");
});

//Router    POST api/auth
//Descr     Auth user and get token
//Access    Public
router.post("/", (req, res) => {
    res.send("Log in user");
});

module.exports = router;
