const jwt = require("jsonwebtoken");

const CookieMiddleware = function checkAuthentication(req, res, next){

    const refresh_token = req.cookies.refresh_token;
    if(!refresh_token) return res.status(401).json({message: "UnAuthentication"})
    jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH, (err, user) => {
        if(err) return res.status(403).json({mssage: "Expired"});
        req.user = user
        next();
    });
}

module.exports = CookieMiddleware;