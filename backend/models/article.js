const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  numArticle: {
    type: Number,
    required: true,
  },
  nom: {
    type: String,
  },

  designation: {
    type: String,
  },

  prixUnitaire: {
    type: Number,
    required: true,
  },

  promotion: {
    type: Number,
  },
  TVA: {
    type: Number,
    required: true,
  },

  stock: {
    type: Number,
    required: true,
  },

  categorie: {
    type: String,
  },
  image: {
    type: String,
    required: false,
  },
});
module.exports = Article = mongoose.model("Article", ArticleSchema);
