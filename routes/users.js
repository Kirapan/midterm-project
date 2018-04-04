"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("name")
      .from("polls")
      .then((results) => {
        res.json(results);
    });
  });
  
  router.get("votes/:id", (req, res) => {
    console.log(req.params.id);
    knex
      .select('polls.name','options.name')
      .from("polls")
      .where('id',req.params.id)
      .innerjoin('options', 'polls.id', '=', 'options.poll_id')
      .then((results) => {
        res.json(results);
        console.log(results);
      });
  });


  return router;
}
