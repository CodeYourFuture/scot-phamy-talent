const express = require("express");
const router = express.Router();

const users = require("./users");
const status = require("./status");
const cities = require("./cities");
const skills = require("./skills");
const companyProfile = require("./companyProfile");
const newOpportunity = require("./opportunities");
const companyRegister = require("./companies");

router.use("/users", users);
router.use("/status", status);
router.use("/cities", cities);
router.use("/skills", skills);
router.use("/company-profile", companyProfile);
router.use("/opportunities", newOpportunity);
router.use("/companies", companyRegister);

module.exports = router;
