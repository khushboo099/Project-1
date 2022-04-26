const authorModel = require("../models/authorModel");


///////////////// [ ALL HANDLER LOGIC HERE ] /////////////////

const createAuthor = async function (req, res) {
  try {
    let authorData = req.body;
    let authorCreation = await authorModel.create(authorData);
    res.status(201).send({ status: true, data: authorCreation });
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports.createAuthor=createAuthor