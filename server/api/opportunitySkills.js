const express = require("express");
const router = express.Router();
const opportunitySkills = require("../services/database/opportunitySkills");

/**
 * The route here will be: /addSkillsToOpportunity/ (remember the prefix users is defined in api/index.js)
 */

router.post("/addSkillsToOpportunity", (req, res) => {
  const skills = req.body.skillsId;
  const opportunityId = req.body.opportunityId;
  // foreach rake the skills array coming from the input and divide it into single input at the table
  skills.forEach((skill) => {
    opportunitySkills
      .newOpportunitySkills(skill, opportunityId)
      .then((data) => {
        res.send({ skillAdded: true });
      })
      .catch((err) => {
        res.sendStatus(500).send({ success: false });
        console.log(err);
      });
  });
});

module.exports = router;
