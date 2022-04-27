const authorModel = require("../models/authorModel");

///////////////// [ ALL HANDLER LOGIC HERE ] /////////////////

const createAuthor = async function (req, res) {
  try {
    const body = req.body;
    const fnameData = body.fname;
    if (!fnameData)
      res.status(400).send({ status: false, msg: "provide first name" });
    const lnameData = body.lname;
    if (!lnameData)
      res.status(400).send({ status: false, msg: "provide last name" });
    const passwordData = body.password;
    if (!passwordData)
      res.status(400).send({ status: false, msg: "provide password" });
    const emailData = body.email;
    if (!emailData) res.status(400).send({ status: false, msg: "give email" });
    const checkEmail = await authorModel.findOne({ email: emailData });
    if (checkEmail)
      res.status(400).send({ status: false, msg: "This email already exists" });
    const titleData = body.title;
    if (titleData) {
      if (titleData == "Mr" || titleData == "Mrs" || titleData == "Miss") {
        let authorCreation = await authorModel.create(body);
        res.status(201).send({ status: true, data: authorCreation });
      } else
        res
          .status(400)
          .send({ status: false, msg: "provide correct enum value" });
    }
  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports.createAuthor = createAuthor;
