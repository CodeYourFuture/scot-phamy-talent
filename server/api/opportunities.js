const express = require("express");
const router = express.Router();
const { createOpportunity } = require("../services/database/opportunities");
const {
  newOpportunitySkills,
} = require("../services/database/opportunitySkills");

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
    name: name,
    description: description,
    contactPerson: contactPerson,
    telephone: telephone,
    email: email,
    city: city,
    date: date,
    type: type,
    skills: skills,
    company_id: company_id,
  };
  createOpportunity(formEntries)
    .then((data) => {
      const opportunityId = data[0].opportunity_id;
      return { opportunityId, skills };
    })
    .then((SkillsAndOpportunityID) => {
      return newOpportunitySkills(SkillsAndOpportunityID);
    })
    .then((data) => res.send({ success: true }))
    .catch((err) => {
      res.sendStatus(500).send({ success: false });
    });
});

module.exports = router;
