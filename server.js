const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Page test");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
