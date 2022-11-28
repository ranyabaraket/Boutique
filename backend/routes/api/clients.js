const express = require("express");
const router = express.Router();
const Client = require("../../models/client");
const User = require("../../models/user");
var jwt = require("jsonwebtoken");
const {  authen } = require("../../utilis/auth");
//get all clients
router.get("/", (req, res) => {
  User.find({ role: "user" }).then((client) => res.json(client));
  
});

//update client

router.put("/:id", authen,(req, res) => {
  User.updateOne(
    {
      _id: req.params.id,
    },
    {
      $set: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        addresse: req.body.addresse,
        telephone: req.body.telephone,
        email:req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    }
  )
    .then((client) => {
      res.json(client);
      console.log("updated");
    })
    .catch((err) => {
      res.json(err);
      console.log("noo");
    });
});

//get client by id
router.get("/:id", (req, res) => {
  Client.findOne({ _id: req.params.id }).then((client) => res.json(client));
});

router.delete("/:id",authen, function (req, res, next) {
  User.deleteOne({ _id: req.params.id }, function (err, client) {
    console.log("Deleting client " + req.params.id);
    res.json(client);
  });
});

router.post("/register", function (req, res, next) {
  var newclient = new Client({
    username: req.body.username,
    email: req.body.email,
    nom: req.body.nom,
    prenom: req.body.prenom,
    addresse: req.body.addresse,
    telephone: req.body.telephone,
    password: Client.hashPassword(req.body.password),
  });

  let promise = newclient.save();

  promise.then(function (doc) {
    return res.status(201).json(doc);
  });

  promise.catch(function (err) {
    return res.status(501).json({ message: "Error registering user." });
  });
});

module.exports = router;
