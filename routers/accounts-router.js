const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  const limit = 10;
  const sortBy = "id";
  const sortDir = "asc";
  db("accounts")
    .orderBy(sortBy, sortDir)
    .limit(limit)
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
      res.status(500).json({ message: "Something went wrong " + err.message });
    });
});

router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update({ name: req.body.name, budget: req.body.budget })
    .then(result => {
      res.status(200).json({
        message: "Account successfully updated",
        result,
        account: {
          name: req.body.name,
          budget: req.body.budget
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating account: " + err.message
      });
    });
});

module.exports = router;
