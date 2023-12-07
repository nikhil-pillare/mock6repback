const express = require('express');
const blogRouter= express.Router();
const BlogModel = require('../models/Blog.model')



blogRouter.get("/blogs", async(req, res)=>{
      try {
        const blogs = await BlogModel.find({username: req.user.userId})
        res.status(200).json(blogs)
      } catch (error) {
        res.status(400).json({"err":error.message})
      }
})

blogRouter.get("/blogs", async(req, res)=>{
    try {
      const {title} = req.query;
      const blogs = await BlogModel.find({title}).populate('username');
      res.status(200).json(blogs)
    } catch (error) {
      res.status(400).json({"err":error.message})
    }
})

blogRouter.get("/blogs", async(req, res)=>{
    try {
      const {category} = req.query;
      const blogs = await BlogModel.find({category, username: req.user.userId}).populate('username');
      res.status(200).json(blogs)
    } catch (error) {
      res.status(400).json({"err":error.message})
    }
})

blogRouter.get("/blogs", async(req, res)=>{
    try {
      const {order} = req.query;
      const blogs = await BlogModel.find({username: req.user.userId}).sort({date: order==="asc"? 1:-1}).populate('username');
      res.status(200).json(blogs)
    } catch (error) {
      res.status(400).json({"err":error.message})
    }
})

blogRouter.post("/blogs", async(req, res)=>{
    try {
      const {title, content, category}= req.body;
      const newBlog= new BlogModel({title, content, category,})
      await newBlog.save();
      res.status(200).json({msg:"blog created successfully",blogs})
    } catch (error) {
      res.status(400).json({"err":"error in v=creating"})
    }
})

blogRouter.put("/blogs/:id", async(req, res)=>{
    try {
      const {id}= req.params;
      const {title, content, category}= req.body;
      const editBlog= await BlogModel.findOneAndUpdate({title, content, category, username: req.user.userId}, {new: true});
      if(!editBlog){
        return res.status(400).json({"err":'blog not found'})
      }
      
      res.status(200).json({msg:"blog updated successfully"})
    } catch (error) {
      res.status(400).json({"err":error.message})
    }
})

blogRouter.delete("/blogs/:id",  async(req, res)=>{
    try {
      const {id}= req.params;
      
      const deleteBlog= await BlogModel.findOneAndDelete({_id: id, username: req.user.userId});
      if(!deleteBlog){
        return res.status(400).json({"err":'blog not found'})
      }
      
      res.status(200).json({msg:"blog deleted successfully"})
    } catch (error) {
      res.status(400).json({"err":error.message})
    }
})

blogRouter.patch("/blogs/:id/like", async(req, res)=>{
    try {
      const {id}= req.params;
      
      const updateBlog= await BlogModel.findOneAndUpdate({_id: id},{$addToSet:{likes: req.user.userId}},{new: true});
      if(!updateBlog){
        return res.status(400).json({"err":'blog not found'})
      }
      
      res.status(200).json({msg:"blog liked successfully"})
    } catch (error) {
      res.status(400).json({"err":error.message})
    }
})

blogRouter.patch("/blogs/:id/comment", async(req, res)=>{
    try {
      const {id}= req.params;
      const {text}= req.body;
      const updateBlog= await BlogModel.findOneAndUpdate({_id: id},{$push:{comments:{user: req.user.userId, text}}},{new: true}).populate('username');
      if(!updateBlog){
        return res.status(400).json({"err":'blog not found'})
      }
      
      res.status(200).json({msg:"commented successfully"})
    } catch (error) {
      res.status(400).json({"err":error.message})
    }
})



module.exports= blogRouter