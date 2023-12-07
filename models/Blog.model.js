const { text } = require('express');
const mongoose = require('mongoose');
const blogSchema= mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'user',},
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: String, required: true},

    date: {type: Date, default: Date.now},
    likes:[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    comments:[{user:{type: mongoose.Schema.Types.ObjectId, ref: 'user'}, text: String}]
})

const BlogModel = mongoose.model("user", blogSchema);

module.exports = BlogModel;