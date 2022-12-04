const {  authen } = require("../../utilis/auth");
const express = require("express");
const router = express.Router();

// Add Mongoose Schema ./models/client
// Client Model
const Cout = require("../../models/cout");

// First thing: module.exports = router;

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/",authen, (req, res) => {
  // use '/' and not '/api/items/
  Cout.find().then((couts) => res.json(couts));
});

// @route   POST api/items
// @desc    Add New Item
// @access  Public
router.post("/",authen, (req, res) => {
  const newCout = new Cout({
    id: req.body.id,
    designation: req.body.designation,
    total: req.body.total,
    date: req.body.date,
    description: req.body.description,
  });
  newCout
    .save()
    .then((cout) => res.json({ success: true, cout }))
    .catch((err) => res.json("Save error: " + err));
});

// @route   DELETE api/items/:id
// @desc    Delete Item
// @access  Public
router.delete("/:id",authen, function (req, res, next) {
  Cout.remove({ _id: req.params.id }, function (err, cout) {
    console.log("Deleting cout " + req.params.id);
    res.json(cout);
  });
});


//update cout

router.put("/:id", authen,(req, res) => {
  Cout.updateOne(
    {
      id: req.params.id,
    },
    {
      $set: {
        designation: req.body.designation,
        description: req.body.description,
        total: req.body.total,
        
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

module.exports = router;
