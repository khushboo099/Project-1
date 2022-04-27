const blogModel = require("../models/blogModel");
const authorModel = require("../models/authorModel");

///////////////// [ ALL HANDLER LOGIC HERE ] /////////////////
const createBlog = async function (req, res) {
  try {
    const id = req.body.authorId;
    const checkId = await authorModel.findById(id);
    if (!checkId)
      return res.status(400).send({ status: false, msg: "provide valid author id" });
    const blogData = req.body;
    if (blogData.isPublished === false) {

      const blogCreation = await blogModel.create(blogData);
      return res.status(201).send({ status: true, data: blogCreation });
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
    const data = req.body;
    const blogId = req.params.blogId;
    const blog = await blogModel.findById(blogId);
    const checkId = await authorModel.findById(data.authorId);

    if (!checkId)
      return res.status(400).send({ status: false, msg: "Provide valid Author id" });

    if (blog) {
      if (blog.isDeleted === false) {
        if (blog.isPublished === false) {
          const updatedDate = await blogModel.findOneAndUpdate({ _id: blogId }, { $set: { isPublished: true, publishedAt: Date.now() } });

        }
        const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { ...data }, { new: true });
        return res.status(200).send({ status: true, data: updatedBlog });

      } else {

        return res.status(404).send({ status: false, msg: "Blog not found" });
      }
    } else {

      return res.status(404).send({ status: false, msg: "Blog ID not found" });
    }
  } catch (err) {

    res.status(500).send({ status: false, msg: err.message });
  }
};



const deleteBlog = async function (req, res) {

  try {

    const blogId = req.params.blogId;
    const checkBlog = await blogModel.findById(blogId);

    if (!checkBlog)

      return res.status(404).send({ status: false, msg: "no blog with this Id" });
    if (checkBlog.isDeleted === true)

      return res.status(404).send({ status: false, msg: "no blog with this Id" });

      const delBlog = await blogModel.findOneAndUpdate(
      { _id: blogId },
      { isDeleted: true }
    );

    res.status(200).send({ status: true, msg: "Your Blog is deleted" });
    
  } catch (err) {

    res.status(500).send({ status: false, msg: err.message });
  }
};


module.exports.createBlog = createBlog;
module.exports.updateBlog = updateBlog;
module.exports.deleteBlog = deleteBlog;