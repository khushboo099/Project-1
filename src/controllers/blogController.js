const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");
const { default: mongoose } = require("mongoose");
const { findById } = require("../models/blogModel");
///////////////// [ ALL HANDLER LOGIC HERE ] /////////////////


///////////////// [ CREATE BLOG HANDLER ] /////////////////
const createBlog = async function (req, res) {
  try {

    const authorId = req.body.authorId;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).send({ status: false, msg: "Provide valid authorId" });
    }

    const presentAuthor = await authorModel.findById({ _id: authorId })
    if (!presentAuthor)
    return res.status(404).send({ status: false, msg: "Author not present" });

    const blogData = req.body;
    if (blogData.isPublished === false) {
      const blogCreation = await blogModel.create(blogData);
      return res.status(201).send({ status: true, data: blogCreation });
    }

    else {
      blogData.publishedAt = Date.now();
      const blogCreation = await blogModel.create(blogData);
      res.status(201).send({ status: true, data: blogCreation });
    }

  }

  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


///////////////// [ GET BLOGS HANDLER ] /////////////////
const getBlogs = async function (req, res) {
  try {

    const queryDetails = req.query;
    if (Object.keys(queryDetails).lenght == 0) {
      const getBlog = await blogModel.find({ isDeleted: false, isPublished: true });

      if (getBlog.length != 0)
        return res.status(200).send({ status: true, data: getBlog });

      if (getBlog.length == 0)
        return res.status(400).send({ status: false, msg: "No blog found" });
    }

    queryDetails.isDeleted = false;
    queryDetails.isPublished = true;

    const authorId = queryDetails.authorId;
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).send({ status: false, msg: "Provide valid authorId" });
    }

    const specificBlogs = await blogModel.find(queryDetails);
    if (specificBlogs.length != 0)
      return res.status(200).send({ status: true, data: specificBlogs });


    if (specificBlogs.length == 0)
      return res.status(404).send({ status: false, msg: "No blog data  found" });
  }

  catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};


///////////////// [ UPDATE BLOG HANDLER ] /////////////////
const updateBlog = async function (req, res) {

  try {

    const data = req.body;

    const blogId = req.params.blogId;
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).send({ status: false, msg: "Provide valid blogId" });
    }

    const blog = await blogModel.findById(blogId);
    if (blog) {
      if (blog.isDeleted === false) {
        if (blog.isPublished === false) {
          const updatedDate = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isPublished: true, publishedAt: Date.now() } });
        }

        const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { ...data }, { new: true });
        return res.status(200).send({ status: true, data: updatedBlog });
      }

      else {
        return res.status(404).send({ status: false, msg: "Blog not found" });
      }
    }

    else {
      return res.status(404).send({ status: false, msg: "Blog ID not found" });
    }

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


///////////////// [ DELETE BLOG HANDLER ] /////////////////
const deleteBlog = async function (req, res) {
  try {

    const blogId = req.params.blogId;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).send({ status: false, msg: "Provide valid blogId" });
    }

    const checkBlog = await blogModel.findById(blogId);
    if (!checkBlog)
      return res.status(404).send({ status: false, msg: "No blog with this Id" });

    if (checkBlog.isDeleted === true)
      return res.status(404).send({ status: false, msg: "No blog with this Id" });

    const delBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true });
    res.status(200).send({ status: true, msg: "Your Blog is deleted" });
  }

  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


///////////////// [ DELETE BY QUERY BLOG HANDLER ] /////////////////
const blogDeleteByQuery = async function (req, res) {
  try {

    const data = req.query
    if (Object.keys(data).length === 0) {
      return res.status(400).send({ status: false, msg: "Please send required queries" })
    }

    if (data.authorId) {
      if (!mongoose.Types.ObjectId.isValid(data.authorId)) {
        return res.status(400).send({ status: false, msg: "Provide valid authorId" });
      }
    }

    if (data) {
      const deletedBlog = await blogModel.updateMany({ $or: [{ authorId: data.authorId }, { category: data.category }, { tags: data.tags }, { subcategory: data.subcategory }, { isPublished: data.isPublished }] },
        { $set: { isDeleted: true, deletedAt: Date.now() } }
      );
      return res.status(201).send({ status: true, msg: "Your blog is deleted" })
    }

    else {
      res.status(404).send({ status: false, msg: "No such blogs exist" })
    }

  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}


///////////////// [ EXPRORTED BLOG HANDLER ] /////////////////
module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;
module.exports.blogDeleteByQuery = blogDeleteByQuery;
