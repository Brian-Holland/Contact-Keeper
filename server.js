const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

app.get("/", (req, res) => {
    res.json({ msg: "Welome to the Contact API" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
