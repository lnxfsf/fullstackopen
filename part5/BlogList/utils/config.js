require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_PASS = process.env.MONGODB_PASS;
const MONGODB_DATABASE =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_DATABASE
    : process.env.MONGODB_DATABASE;

module.exports = { MONGODB_PASS, PORT, MONGODB_DATABASE };
