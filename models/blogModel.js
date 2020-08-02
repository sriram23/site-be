const mongoose = require('mongoose')
const db = require('../config/database')

const blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    createdAt: Date,
    updatedAt: Date,
    content: String,
});

Blog = mongoose.model('blog',blogSchema)

module.exports = Blog