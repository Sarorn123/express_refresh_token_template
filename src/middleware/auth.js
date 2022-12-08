const jwt = require("jsonwebtoken");

const AuthMiddleware = function checkAuthentication(req, res, next){

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if(!token) res.status(401).json({message: "UnAuthentication"})
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).json({mssage: "Expired"})
        next();
    });
    
}

module.exports = AuthMiddleware;