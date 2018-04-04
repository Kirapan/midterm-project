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
  
  router.get("/votes/:id", (req, res) => {
    knex
      .select('polls.name as pollsname','options.name as optionsname')
      .from("polls")
      .innerJoin('options', 'polls.id', '=', 'options.poll_id')
      .where('polls.id',req.params.id)
      .then((results) => {
        res.json(results);
      });
  });

  rounter.post('/new', (req, res) => {
    
  })


  return router;
}
