

const authorization = (roles) =>{
    return (req, res, next) => {
        const role = req.headers.role;
        if(!roles.includes(role)){
            res.status(401).json({message: "access denie"})
        }
        next();
    }
}
module.exports = {authorization}