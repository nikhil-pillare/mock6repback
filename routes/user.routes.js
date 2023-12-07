const UserModel = require('../models/User.Model');
const express = require('express');
const bcypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter= express.Router();

userRouter.post("/register", async(req,res)=>{
      const {username, email, avatar, password}= req.body;
      try {
        bcypt.hash(password, 6, async (err, hash)=>{
            const newUser= new UserModel({username, email, avatar, password: hash});
            await newUser.save();
            res.status(200).json({"msg":"user registered Successfully", newUser})
        })
      } catch (error) {
            res.status(400).json(error.message)
      }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password}= req.body;

    try {
      const user= await UserModel.findOne({email});
      if(user){
        bcypt.compare(password, user.password, function (err, result){
            if(result){
                const token= jwt.sign({userId: user._id}, process.env.key)
                res.status(200).json({msg:"login success", token})
            }else{
                res.status(400).json({msg:"login failed"})
            }
        })
      }else{
            res.status(400).json({msg:"login falied"})
      }
    } catch (error) {
          res.status(400).json(error.message)
    }
})

module.exports = userRouter;