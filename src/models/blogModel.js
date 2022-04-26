const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
///////////////// [ BLOG SCHEMA HERE ] /////////////////
const blogSchema = new mongoose.Schema({
    
        title: {type:String,
            required:true
        },

        body: {type:String,
            required:true
        },
        authorId:{
            type:ObjectId,
            ref:Author
        },
        tags:String,
        category: {type:String,
        required:true
    },
        subcategory:String,
        isPublished: {type:Boolean,
        default:false
    },
        publishedAt:String, // if published is true publishedAt will have a date 2021-09-17T04:25:07.803Z
        isDeleted: {type:Boolean,
        default:false
    },
        deletedAt:String , // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,
},{timestamps:true})
module.exports = mongoose.model("Blog", blogSchema)