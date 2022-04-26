const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
///////////////// [ BLOG SCHEMA HERE ] /////////////////
const blogSchema = new mongoose.Schema({















},{timestamps:true})
module.exports = mongoose.model("Blog", blogSchema)