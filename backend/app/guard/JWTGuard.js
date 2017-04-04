const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/config").security.jwt;

class JWTGuard{
    constructor(){
    }
    static generateToken(payload){
        let token =  jwt.sign(
            payload,
            jwtConfig.jwtSecretString,
            {
                expiresIn:jwtConfig.expiresIn,
                algorithm:jwtConfig.algorithm

            });
        return token;
    }

    static validateTokenSync(token){
        if(!token) return {allowed:false,reason:"no token provided"};
        try {
            jwt.verify(token, jwtConfig.jwtSecretString);
        }catch(err){
            let result ={};
            result.allowed = false;
            result.reason = err.toString();
            return result;
        }
        return {allowed:true};
    }

    static validateTokenWithCallBack(token,callback){
        jwt.verify(token, jwtConfig.jwtSecretString, callback);
    }
}

module.exports = JWTGuard;
