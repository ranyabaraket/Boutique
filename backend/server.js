// Imports
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const cors = require("cors");


// Lunch Express
const app = express();
app.use(express.json({limit: '50mb'}));
// Body Parser Middlleware for API
app.use(express.json());

//cors middlleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//passport middlleware

// 1- Add DB config
const db = require("./config/key").mongoURI;



// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("MongoDB error: " + err));

// 2- Add Routes API ./routes/api
// Items route API Midleware



// Port for production
const port = process.env.PORT || 5000;

// Lunch server
app.listen(port, () => console.log(`Server running on port ${port}...`));
