const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
const ClientSchema = new Schema({
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

  email: { type: String, require: true },

  prenom: {
    type: String,
  },

  addresse: {
    type: String,
  },

  telephone: {
    type: Number,
  },
});

ClientSchema.statics.hashPassword = function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
};

ClientSchema.methods.isValid = function (hashedpassword) {
  return bcrypt.compareSync(hashedpassword, this.password);
};

module.exports = Client = mongoose.model("Client", ClientSchema);
