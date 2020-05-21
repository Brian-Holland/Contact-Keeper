const express = require("express");
const router = express.Router();

//Route     GET api/contacts
//Desc      Get all users contacts
//Access    Private
router.get("/", (req, res) => {
    res.send("Get user contacts");
});

//Route     POST api/contacts
//Desc      Add new contact
//Access    Private
router.post("/", (req, res) => {
    res.send("Add contact");
});

//Route     PUT api/contacts
//Desc      Update contact
//Access    Private
router.put("/:id", (req, res) => {
    res.send("Update contact");
});

//Route     DELETE api/contacts
//Desc      Delete contact
//Access    Private
router.delete("/:id", (req, res) => {
    res.send("Delete contact");
});

module.exports = router;
