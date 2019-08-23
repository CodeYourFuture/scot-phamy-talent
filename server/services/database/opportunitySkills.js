const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

// newOpportunitySkills inserts the opportunity id and skill to a new row at opportunity_skills table

const newOpportunitySkills = (skills, opportunityId) => {
  skills.forEach((skill) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO opportunity_skills (skill_id, opportunity_id)VALUES ($1, $2)",
        [skill, opportunityId],
        (error, result) => {
          if (error) {
            reject(error);
            console.log(error);
          }

          resolve(result.rows);
        },
      );
    });
  });
};
module.exports = { newOpportunitySkills };
