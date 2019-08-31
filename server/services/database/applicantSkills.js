const { Pool } = require("pg");
const config = require("../../config");
const format = require("pg-format");
const pool = new Pool(config);

// newApplicantSkills inserts the opportunity id and skill to a new row at opportunity_skills table
//need to install pg-format https://www.wlaurance.com/2018/09/node-postgres-insert-multiple-rows/   to insert multiple entries
// Using pg-format to insert multiple rows with Node Postgres

const newApplicantSkills = ({ skills, applicantId }) => {
	const SkillsAndIdArray = skills.map((skill) => [skill, applicantId]);
	const query = format(
		"INSERT INTO applicant_skills (skill_id, applicant_id) VALUES %L",
		SkillsAndIdArray
	);
	return new Promise((resolve, reject) => {
		pool.query(query, (error, result) => {
			if (error) {
				reject(error);
			}
			resolve(result.rows);
		});
	});
};

module.exports = { newApplicantSkills };
