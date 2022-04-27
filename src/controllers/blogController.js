const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

///////////////// [ ALL HANDLER LOGIC HERE ] /////////////////
const createBlog = async function (req, res) {
  try {
    const id = req.body.authorId;
    const checkId = await authorModel.findById(id);
    if (!checkId)
      res.status(400).send({ status: false, msg: "provide valid author id" });
    const blogData = req.body;
    if (blogData.isPublished === false) {
      const blogCreation = await blogModel.create(blogData);
      res.status(201).send({ status: true, data: blogCreation });
    } else {
      blogData.publishedAt = new Date();
      const blogCreation = await blogModel.create(blogData);
      res.status(201).send({ status: true, data: blogCreation });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const updateBlog = async function (req, res) {
  try {
    const blogId =req.params.blogId;
    const data = await blogModel.findById(blogId);
    
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;