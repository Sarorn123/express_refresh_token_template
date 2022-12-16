const express = require("express");
const app = express();
require('dotenv').config();
// require("./db");
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// auth middleware 
const cookieMiddleware = require('./middleware/cookieMiddleware');
const authMiddleware = require('./middleware/auth');

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

    const user = {
        username: "jonh",
        id: 1,
        roles: [
            "Admin",
        ]
    }

    const access_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10s' });
    const refresh_token = jwt.sign(user, process.env.JWT_SECRET_REFRESH, { expiresIn: '7d' });

    // const date = new Date();
    // date.setHours(date.getHours() + 5);

    res.cookie('refresh_token', refresh_token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days must equal to refresh token life time
    });
    res.json({ user: user, access_token: access_token });
});

app.get('/refresh', cookieMiddleware, (req, res) => {
    const user = {
        username: req.user.username,
        id: req.user.id,
        roles: req.user.roles,
    };
    const access_token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '10s' });
    res.status(200).json({ access_token: access_token, user: user });
});

app.get('/logout', authMiddleware, (req, res) => {
    res.clearCookie('refresh_token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    });
    res.status(200).json({ message: "Logout Success" });
})

app.get('/todo', authMiddleware, (req, res) => {
    res.status(200).json([
        {
            id: 1,
            title: 'Wash Hand',
        },
        {
            id: 2,
            title: 'Walking zoon',
        },
    ])
})

app.listen(process.env.PORT, () => {
    console.log("Running in port = " + process.env.PORT);
});