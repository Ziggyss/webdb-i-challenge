const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Cannot get data: " + err.message });
    });
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({ message: "Something went wrong: " + err.message });
    });
});

router.post("/", (req, res) => {
  db("accounts")
    .insert({ name: req.body.name, budget: req.body.budget })
    .then(result => {
      res.status(201).json({
        message: "Account number " + result + " successfully added",
        account: { name: req.body.name, budget: req.body.budget }
      });
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(result => {
      res
        .status(200)
        .json({ message: "Number of accounts deleted: " + result });
    })
    .catch(err => {
      res.status(500).json("Something went wrong " + err.message);
    });
});



module.exports = router;
