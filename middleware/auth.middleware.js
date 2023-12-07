
const jwt = require('jsonwebtoken');

require('dotenv').config();

const auth=(req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.key, (err, decoded)=>{
            if(decoded){
                req.user= decoded
                next()
            }else{
                res.status(400).json({msg:"token invalid"})
            }
        })
    }else{
        res.status(400).json({msg:"token not recieved"})
    }
}

module.exports= auth;