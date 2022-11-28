const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  cin: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
  },

  prenom: {
    type: String,
  },

  mail: {
    type: String,
  },

  telephone: {
    type: Number,
  },

  categorie:{type:String},
  salaire:{type:Number,required:true}
});
module.exports = Employee = mongoose.model("Employee", EmployeeSchema);
