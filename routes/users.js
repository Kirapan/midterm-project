"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/all", (req, res) => {
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
      .rightOuterJoin('options', 'polls.id', '=', 'options.poll_id')
      .where('polls.id',req.params.id)
      .then((results) => {
        res.json(results);
      });
  });


  router.get('/result/:id', (req,res) => {
    getPolls(req.params.id)
    .then (function (output){
      res.json(result);
    })
    .catch(function (err) {
      res.status(400).send(err);
    })
  })
  
  router.post('/new', (req, res) => {
    let options = req.body.options
    savePolls
    .returning('id')
    .then(function(id){
      options.forEach((option) => {
        knex('options')
        .insert({poll_id: id, name: option})
        .then(function (result) {
          res.send();
        })
        .catch(function (err){
          res.status(400).send(err);
        })
      })
    })
    .catch(function (err) {
      res.status(400).send(err);
    })
  })
  
  router.delete('/delete/:id', (req,res) => {
    knex
    .select('email')
    .from('polls')
    .where('email',req.params.id)
    .then(function(result){
      if (result.email === req.body.email ) {
        deletePolls(req.params.id)
        .then (function (){
          res.send()
        })
        .catch(function (err){
          res.status(400).send(err);
        })
        deleteOptions(req.params.id)
        .then (function (){
          res.send()
        })
        .catch(function (err){
          res.status(400).send(err);
        })
      }
      else {
        console.log('Permission denied. Only creator has the permission to delete this poll. ')
      }
    })
    .catch(function (err){
      res.status(400).send(err);
    })
  })

  router.put('/edit/:id', (req,res) => {
    let data = req.body.options;
    knex('polls')
    .where('id',req.params.id)
    .update({
      name: req.body.title,
      email: req.body.email
    })
    .then(function(){
      findAndUpdateOptions(req.params.id,data)
      .then(function () {
        res.send();
      })
      .catch(function (err){
        res.status(400).send(err);
      })
    })
    .catch(function (err){
      res.status(400).send(err);
    })
  
    
  })
  return router;
}


function getPolls(id) {
  return knex
  .select('options.name as optionname','options.rank','polls.name as pollname')
  .from('polls')
  .rightOuterJoin('options')
  .where('id',id).andWhere('polls.id','options.poll_id');
}

function savePolls (data) {
  return knex("polls")
  .insert({name: data.name, email: data.email, created_at: Date.now()})
}

function deletePolls (id) {
  return knex
  .select()
  .from('polls')
  .where('id',id)
  .delete() 
}

function deleteOptions (id) {
  return knex
  .select()
  .from('options')
  .where('poll_id',id)
  .delete()
}

function findAndUpdateOptions (pollid,data) {
  return knex
  .select()
  .from('options')
  .where('poll_id', pollid)
  .then(function (result) {
    result.forEach(function (option){
      if (option.id === data.optionid) {
        return knex('options')
        .where('id',data.option.id)
        .update({
          name: data.name
        })
        .then(function () {
          res.send();
        })
        .catch(function (err){
          res.status(400).send(err);
        })
      } else {
        return knex('options')
        .insert({poll_id: pollid, name: data.name})
        .then(function () {
          res.send();
        })
        .catch(function (err){
          res.status(400).send(err);
        })
      }
    })
  })
  .catch (function (err){
    res.status(400).send(err);
  })
}
