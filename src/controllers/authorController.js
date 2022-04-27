const authorModel = require("../models/authorModel");


///////////////// [ ALL HANDLER LOGIC HERE ] /////////////////

const createAuthor = async function (req, res) {
  try {

    let fnameData = req.body.fname;
    if(!fnameData) res.status(400).send({status:false,msg:"give first name"})
    // if(!authorData) res.status(400).send({status:false,msg:"give required values"})
    else{
    let authorCreation = await authorModel.create(authorData);
    res.status(201).send({ status: true, data: authorCreation });
    }
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports.createAuthor=createAuthor