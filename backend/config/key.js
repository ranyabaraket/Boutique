require("dotenv").config();
module.exports = {
  mongoURI: "mongodb://localhost:27017/myboutique",
  SECRET: process.env.APP_SECRET,
};
