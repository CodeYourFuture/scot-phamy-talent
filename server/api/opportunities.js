const express = require("express");
const router = express.Router();
const opportunities = require("../services/database/opportunities");

/**
 * The route here will be: /opportunities/ (remember the prefix users is defined in api/index.js)
 */

// post the new opportunity  takes the values from the body transferred from client api/opportunities
router.post("/newOpportunity", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const contactPerson = req.body.contactPerson;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const city = req.body.city;
  const date = req.body.date;
  const type = req.body.type;
  const skills = req.body.skills;
  const company_id = req.body.company_id;
  let formEntries = {
    name,
    description,
    contactPerson,
    telephone,
    email,
    city,
    date,
    type,
    skills,
    company_id,
  };
  opportunities
    .createOpportunity(formEntries)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.sendStatus(500).send({ success: false });
      console.log(err);
    });
});

router.get("/getOpportunityId", (req, res) => {
  const name = req.query.name;
  const description = req.query.description;

  opportunities
    .getOpportunityId(name, description)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.Status(500);
    });
});

module.exports = router;
