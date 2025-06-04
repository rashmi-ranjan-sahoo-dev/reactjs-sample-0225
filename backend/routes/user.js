require('dotenv').config(); // Load .env

const express = require("express");
const UserRoute = express.Router();
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const { userModel } = require("../db");
const bcrypt = require("bcrypt");
const { error } = require('zod/v4/locales/ar.js');


UserRoute.post("/signup",async function(req,res){
   const validedData = z.object({
     email:z.string().min(4).max(40).email(),
        password:z.string().min(8).regex(/[A-Z]/)
                                  .regex(/[a-z]/)
                                  .regex(/[0-9]/)
                                  .regex(/[^A-Za-z0-9]/,),
       firstName:z.string(),
       lastName:z.string(),
   })

   const parsed = validedData.safeParse(req.body)

   if(!parsed.success){
    console.log(parsed.error.errors)
        res.json({
            msg:"incorrect format",
            error:parsed.error
        })
        return
   }

   const { email, password, firstName, lastName} = req.body
try{
   const hashedPassword = await bcrypt.hash(password,5)

   const user = await userModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName
   })

   console.log(user)

   res.send({
    msg:"siginup successful",
   })
 }catch(error){

    console.error("Error during user signup:", error);

    res.status(500).json({
        message: "An error occurred during signup",
        error: error.message
    });
   }

})

UserRoute.post("/signin",async function(req,res){
    const validedData = z.object({
        email:z.string().min(4).max(40).email(),
        password:z.string().min(8).regex(/[A-Z]/)
                                  .regex(/[a-z]/)
                                  .regex(/[0-9]/)
                                  .regex(/[^A-Za-z0-9]/,)
    })

    const parsed = validedData.safeParse(req.body)

    if(!parsed.success){
         res.json({
            msg:"incorrect format",
            error:parsed.error.errors
        })
        return
    }
  
    const { email, password} = req.body;

     try{
        const user = await userModel.findOne({
            email:email
        })

        if(!user){
           res.status(403).json({
            msg:"user not found"
           })
        }

        const passwordMatch = await bcrypt.compare(password,user.password)

        if(passwordMatch){
            const token = jwt.sign({id:user._id.toString()},process.env.JWT_USER_SECRET);

       return res.status(200).json({
            token,
            msg:"Signin successful",
            firstName:user.firstName
          })
       }else{
        res.status(403).json({
            msg:"Incorrect credentials"
        })
       }
     }catch(error){
    console.error("Error during user signin:", error);

    res.status(500).json({
        message: "Server error during signin",
        error: error.message
    });
   }
})

module.exports = {
    UserRoute
}