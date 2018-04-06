"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  function getPolls(id) {
   return knex
     .select('options.name as optionsname', 'options.rank', 'polls.name as pollname', 'polls.email as useremail')
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
  
  function votesCaculator (arrayOfArrays) {
    arrayOfArrays.forEach(function (array) {
      let i = array.length - 1;
  
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

  router.get("/votes/:id", (req, res) => {
    knex
      .select('polls.name as pollsname', 'options.name as optionsname')
      .from("polls")
      .rightOuterJoin('options', 'polls.id', '=', 'options.poll_id')
      .where('polls.id', req.params.id)
      .then((results) => {
        // res.json(results);
        res.render("votes");
      });
  });


  //need a votes post! to calculate the points
  router.post("/votes/:id", (req, res) => {

  })

  router.get('/result/:id', (req, res) => {
    getPolls(req.params.id)
      .then(function (output) {
        res.json(result);
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
      res.send();
    })
    .catch(function (err) {
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
            res.send(results);
          })
          .catch(function (err) {
            res.status(400).send(err);
          })
      })
      .catch(function (err) {
        res.status(400).send(err);
      })
    })

//Adding the Edit Page


  router.get('/edit/:id', (req, res) => {
    
    getPolls(req.params.id)
    .then((poll) => {
          res.render("edit", poll);
        })
     // knex
     //  .select()
     //  .from("polls") //Need to talk about the editing 
     //    .then((poll) => {
     //      res.json(poll);
     //      // res.render(results)
     //    })
      .catch(err=>{
           
           res.status(400).send(err);
      });
    });

  // router.get('/edit', (req, res) => {
    
  //   res.render("edit")
  //   });




  // router.get('/edit/:id', (req, res) => {
  //   let templateVars = {};
  //    knex
  //     .select()
  //     .from("polls")
  //     .where("id", req.params.id) //Need to talk about the editing 
  //       .then((results) => {
        
  //         // res.json(templateVars);
  //         res.render("edit", results)
  //       })
  //     .catch(err=>{
           
  //          res.status(400).send(err);
  //     }); 
  //   });


  return router;
};


