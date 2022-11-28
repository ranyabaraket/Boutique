const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  nom: {
    type: String,
  },
  prenom: {
    type: String,
  },

  email: { type: String, required: true },
  addresse: { type: String },

  telephone: { type: Number },

  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
});


mongoose.models = {}; 

const User = mongoose.model.users || mongoose.model('users', UserSchema);

//module.exports = User = mongoose.model("User", UserSchema);
module.exports=  User;