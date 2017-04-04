const Guard =require("../../guard/JWTGuard");
const validToken = function (req, res, next) {
    let candidateToken = req.body.token || req.headers["token"];
    let result = Guard.validateTokenSync(candidateToken);
    if(result.allowed){
        next();
    }else{
        next(new Error(result.reason));
    }
}

module.exports = validToken;
