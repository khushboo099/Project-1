const AuthorModel = require('../models/authorModel')


///////////////// [ ALL HANDLER LOGIC HERE ] /////////////////

const authorSchema = new mongoose.Schema({











},{timestamps:true})
module.exports = mongoose.model("Author", authorSchema)