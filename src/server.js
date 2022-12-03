const express = require("express");
const app = express();
require('dotenv').config();
require("./db");
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require('cors');

var corsOptions = {
    credentials: true,
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

// route 
const userRoute = require("./routes/userRoute");

app.use(express.static(path.join(__dirname, '../uploads')));
app.use(express.json());

app.use("/user", userRoute);
app.use(cookieParser());

app.post("/login", async (req, res) => {

    const date = new Date();
    date.setHours(date.getHours() + 5);

    res.cookie('refresh_token','refresh_token_here', {
        secure: true,
        httpOnly: true,
        expires: date,
        // domain: 'http://localhost:5000',
        sameSite: 'none',
    });
    res.json({ access_token: 'access token here' });
});

app.listen(5000, () => {
    console.log("Running in port = " + 5000);
});