const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);
const { newOpportunitySkills } = require("./opportunitySkills");

const createOpportunity = async ({
  name,
  description,
  contactPerson,
  telephone,
  email,
  city,
  date,
  type,
  skills,
  company_id, // hard coded
}) => {
  try {
    const InsertAndGetID = await pool.query(
      "INSERT INTO opportunities (name ,description ,contact_person,telephone ,email ,city,date,type,company_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING opportunity_id",
      [
        name,
        description,
        contactPerson,
        telephone,
        email,
        city,
        date,
        type,
        company_id,
      ],
    );
    const opportunityId = InsertAndGetID.rows[0].opportunity_id;
    await newOpportunitySkills(skills, opportunityId);
    return {
      success: true,
      message: {
        messageHeader: "Opportunity submitted",
        messageBody: "opportunity waiting for approval",
      },
    };
  } catch (error) {
    return {
      success: false,
      message: {
        messageHeader: "There is an error occurred",
        messageBody: "Check your entries",
      },
      error,
    };
  }
};

module.exports = { createOpportunity };
