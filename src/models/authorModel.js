const mongoose = require('mongoose');
const { default: isEmail } = require("validator/lib/isEmail")

///////////////// [ AUTHOR SCHEMA HERE ] /////////////////
const authorSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:["Mr","Mrs","Miss"]
    },
    email:{
        type:String,
        unique:true,
        validate:[isEmail,'invalid email']
        
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("Author", authorSchema)