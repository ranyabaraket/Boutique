const express = require("express");
const router = express.Router();
const {  authen } = require("../../utilis/auth");
// Add Mongoose Schema ./models/client
// Client Model
const Employee = require("../../models/employee");

// First thing: module.exports = router;

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", authen,(req, res) => {
  // use '/' and not '/api/items/
  Employee.find().then((employees) => res.json(employees));
});

// @route   POST api/items
// @desc    Add New Item
// @access  Public
router.post("/", authen,(req, res) => {
  const newEmployee = new Employee({
    cin: req.body.cin,
    nom: req.body.nom,
    prenom: req.body.prenom,
    mail: req.body.mail,
    telephone: req.body.telephone,
    categorie: req.body.categorie,
    salaire:req.body.salaire,
  });
  newEmployee
    .save()
    .then((employee) => res.json({ success: true, employee }))
    .catch((err) => res.json("Save error: " + err));
});

//update employee

router.put("/:id", authen,(req, res) => {
  Employee.updateOne(
    {
      id: req.params.id,
    },
    {
      $set: {
        nom: req.body.nom,
        prenom: req.body.prenom,
        mail: req.body.mail,
        telephone: req.body.telephone,
        categorie: req.body.categorie,
        salaire:req.body.salaire,
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

//get employee by id
router.get("/:id",authen, (req, res) => {
  Employee.findById({ _id: req.params.id }).then((emp) => res.json(emp));
});

router.delete("/:id",authen, function (req, res, next) {
  Employee.remove({ _id: req.params.id }, function (err, employee) {
    console.log("Deleting employee " + req.params.id);
    res.json(employee);
  });
});

module.exports = router;
