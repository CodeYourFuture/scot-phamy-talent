const { Pool } = require("pg");
const config = require("../../config");
const pool = new Pool(config);

const getAllCompanies = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM company_profile", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
};

const registerCompany = ({ name, description, industry, user_id }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO company_profile (name ,description , industry ,user_id) VALUES($1,$2,$3,$4)",
      [name, description, industry, user_id],
      (error, result) => {
        console.log("Database", error, result);
        if (error) {
          reject(error);
        }
        console.log(result);
        resolve(result.rows);
      }
    );
  });
};

module.exports = { registerCompany, getAllCompanies };
