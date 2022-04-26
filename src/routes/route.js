const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController");
const blogController= require("../controllers/blogController");

///////////////// [ ALL API's HERE ] /////////////////
router.post('/authors',authorController.createAuthor)
router.post('/blogs',blogController.createBlog)








module.exports = router;