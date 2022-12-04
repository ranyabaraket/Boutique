require("dotenv").config();
module.exports = {
  mongoURI: "mongodb://localhost:27017/boutique",
  SECRET: process.env.APP_SECRET,
};
