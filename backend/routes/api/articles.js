const express = require("express");
const router = express.Router();
const {  authen } = require("../../utilis/auth");
const Article = require("../../models/article");

router.get("/", (req, res) => {
  // use '/' and not '/api/items/
  Article.find().then((articles) => res.json(articles));
});

router.post("/", authen,(req, res) => {
  const newArticle = new Article({
    numArticle: req.body.numArticle,
    nom: req.body.nom,
    designation: req.body.designation,
    prixUnitaire: req.body.prixUnitaire,
    promotion: req.body.promotion,
    TVA: req.body.TVA,
    stock: req.body.stock,
    categorie: req.body.categorie,
    image: req.body.image,
  });
  newArticle
    .save()
    .then((article) => res.json({ success: true, article }))
    .catch((err) => res.json("Save error: " + err));
});





//get facture by num
router.get("/:numArticle", (req, res) => {
  Article.findOne({ numArticle: req.params.numArticle }).then((fact) =>
    res.json(fact)
  );
});


//update article

router.put("/:id",authen, (req, res) => {
  Article.updateOne(
    {
      id: req.params.id,
    },
    {
      $set: {
        nom: req.body.nom,
        designation: req.body.designation,
        prixUnitaire: req.body.prixUnitaire,
        promotion: req.body.promotion,
        TVA: req.body.TVA,
        stock: req.body.stock,
        categorie: req.body.categorie,
        image: req.body.image,
      },
    }
  )
    .then((art) => {
      res.json(art);
      console.log("updated");
    })
    .catch((err) => {
      res.json(err);
      console.log("noo");
    });
});

// @route   DELETE api/items/:id
// @desc    Delete Item
// @access  Public
router.delete("/:id", authen,function (req, res, next) {
  Article.remove({ _id: req.params.id }, function (err, article) {
    console.log("Deleting article " + req.params.id);
    res.json(article);
  });
});



router.delete("/byId/:numArticle",authen, function (req, res, next) {
  Article.remove({ numArticle: req.params.numArticle }, function (err, article) {
    console.log("Deleting article " + req.params.numArticle);
    res.json(article);
  },err=>{console.log(err)});
});




module.exports = router;
