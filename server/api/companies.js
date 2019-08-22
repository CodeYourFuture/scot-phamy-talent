const express = require("express");
const router = express.Router();
const companyRegister = require("../services/database/companies");

router.get("/", (req, res) => {
  companyRegister
    .getAllCompanies()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const industry = req.body.industry;
  const user_id = req.body.user_id;
  let form = {
    name,
    description,
    industry,
    user_id
  };
  companyRegister
    .registerCompany(form)
    .then(data => {
      res.send({ success: true });
    })
    .catch(err => {
      res.status(500).send({ success: false });
      console.log(err);
    });
});

module.exports = router;
