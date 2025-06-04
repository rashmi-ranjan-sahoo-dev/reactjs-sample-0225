require('dotenv').config(); // Load .env

const z = require("zod");
const jwt = require("jsonwebtoken")

async function auth(req,res,next) {
       const token = req.headers.token
    try{
        const decodedData = jwt.verify(token,process.env.JWT_USER_SECRET)

        if(decodedData){
            req.userId = decodedData.id;
            next();
        }else{
            res.status(403).json({
                msg:"Incorrect credentials"
            })
        }
    }catch(error) {
        console.error("Error during todo operation:",error)
        res.status(500).json({
            msg:"An error occurred during todo operation",
            error:error.message
        })
    }

}

// async function userMiddleWare(req,res,next) {
//     const token = req.headers.token ;

//     if(!token){
//         return res.status(401).send({
//             msg:"token is required"
//         })
//     }

//     const userDetails = jwt.ver
// }

module.exports = {
    auth
}