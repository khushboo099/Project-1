const mongoose = require('mongoose');
const { default: isEmail } = require("validator/lib/isEmail")

///////////////// [ AUTHOR SCHEMA HERE ] /////////////////
const authorSchema = new mongoose.Schema({















},{timestamps:true})
module.exports = mongoose.model("Author", authorSchema)