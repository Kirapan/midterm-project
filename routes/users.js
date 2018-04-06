"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  function getPolls(id) {
    return knex
      .select('options.name as optionsname', 'options.rank', 'polls.name as pollname','polls.email as useremail')
      .from('polls')
      .rightOuterJoin('options', 'polls.id', '=', 'options.poll_id')
      .where('polls.id', id)
  }

  
  function savePolls(data) {
    return knex('polls')
      .insert({
        name: data.name, 
        email: data.email, 
        created_at: new Date().toISOString()
      })
  }
  
  function deletePolls(id) {
    return knex
      .select()
      .from('polls')
      .where('id', id)
      .delete()
  }
  
  function deleteOptions(id) {
    return knex
      .select()
      .from('options')
      .where('poll_id', id)
      .delete()
  }
  
  function findAndDelete (id, email) {
    return new Promise (function (resolve,reject) {
      knex
        .select('email')
        .from('polls')
        .where('email', id)
        .then(function (result) {
          let promises = [];
          if (result.email === email) {
              promises.push(deletePolls(id))
                .then(function () {
                  promises.push(deleteOptions(id))
                })
          } else {
            console.log('Permission denied. Only creator has the permission to delete this poll. ')
          }
  
          Promise.all(promises).then(function () {
            return resolve();
          }).catch(function (err) {
            return reject(err);
          })
        })
        .catch(function (err) {
          res.status(400).send(err);
        })
    })
  }
  
  function findAndUpdateOptions(pollid, data) {
    return new Promise(function (resolve, reject) {
      knex
        .select()
        .from('options')
        .where('poll_id', pollid)
        .then(function (result) {
          let promises = [];
          result.forEach(function (option) {
            if (option.id === data.optionid) {
              promises.push(knex('options')
                .where('id', data.option.id)
                .update({
                  name: data.name
                }));
            } else {
              promises.push(knex('options')
                .insert({ poll_id: pollid, name: data.name }))
            }
  
            Promise.all(promises).then(function (results) {
              return resolve(results);
            }).catch(function (err) {
              return reject(err);
            })
          })
        })
        .catch(function (err) {
          return reject(err);
        });
    })
  }
  
  function votesCaculator (votesArr) {
    let votes = 
    votes.forEach(function (voteObj) {
      let vote = [];
      for (let key in voteObj) {
        vote.push(voteObj[key]);
      }
  
    })
  }
  
  function saveOptions(id, arr) {
    return new Promise(function(resolve, reject)
    { 
      if(!arr || !id) {
        return reject(err);
      }
      else {
        arr.forEach((option) => {
          knex('options')
          .insert({poll_id: id, name: option})
        })
        return resolve(arr);
      }
    });
  }

  function rankUp (array){
    return new Promise (function (resolve, regject) {
      if (!arr) {
        return reject(err);
      }
      else {
        arr.forEach(function (obj) {
          knex('options')
          .where('id', Object.keys(obj))
          .increment('rank',obj[Object.keys(obj)])
        })
        return resolve(arr);
      }
    })
  }

  router.get("/all", (req, res) => {
    knex
      .select("name", "id")
      .from("polls")
      .then((results) => {
        res.json(results);
      });
  });
//works
  router.get("/votes/:id", (req, res) => {
    knex
      .select('polls.name as pollsname', 'options.name as optionsname')
      .from("polls")
      .rightOuterJoin('options', 'polls.id', '=', 'options.poll_id')
      .where('polls.id', req.params.id)
      .then((results) => {
        res.send(results).render("votes");
      });
  });

  router.post("/votes/:id", (req, res) => {
    let arr = req.body;
    rankUp(arr)
    .then(function (result){
      res.send(result);
    })
    .catch (function(err){
      res.status(400).send(err);
    })
      
  })
//works
  router.get('/result/:id', (req, res) => {
    getPolls(req.params.id)
      .then(function (output) {
        res.send(output);
      })
      .catch(function (err) {
        res.status(400).send(err);
      })
  })


  router.post('/new', (req, res) => {
    let options = req.body;
    let optionArray = options.options;
    savePolls(options)
    .returning('id')
    .then(function(id){     
      console.log('nope',id);
      optionArray.forEach((option) => {
        knex('options')
        .insert({poll_id: id, name: option})
        .then (function (result) {
          
        })
        .catch(function (err){
          // res.status(400).send(err);
        })
      })
      res.send();
    })
    .catch(function (err) {
      console.log('nope!!!', err)
      res.status(400).send(err);
    })
  })

  router.delete('/delete/:id', (req, res) => {
    findAndDelete(req.params.id, req.params.email)
    .then(function () {
      res.redirect("/all");
    })
    .catch(function (err) {
      res.status(400).send(err);
    })
  })
//works
  router.get('/edit/:id', (req, res) => {
    getPolls(req.params.id)
    .then(function (result) {
      res.send(result);
    })
    .catch(function (err){
      res.status(400).send(err);
    })
  })

  router.put('/edit/:id', (req, res) => {
    let data = req.body;
    knex('polls')
      .where('id', req.params.id)
      .update({
        name: req.body.title,
        email: req.body.email
      })
      .then(function () {
        findAndUpdateOptions(req.params.id, data)
          .then(function (results) {
            res.send(results).redirect("/all");
          })
          .catch(function (err) {
            res.status(400).send(err);
          })
      })
      .catch(function (err) {
        res.status(400).send(err);
      })
    })


  return router;
};



