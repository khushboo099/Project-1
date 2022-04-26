const express = require('express');
const router = express.Router();
const AuthorController= require("../controllers/authorController");
const BlogController= require("../controllers/blogController");

///////////////// [ ALL API's HERE ] /////////////////
router.post('/authors',AuthorController.createAuthor)









module.exports = router;