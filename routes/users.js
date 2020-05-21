const express = require("express");
const router = express.Router();

//Route     POST api/users
//Desc      Register user
//Access    Public
router.post("/", (req, res) => {
    res.send("Registers a user");
});

module.exports = router;
