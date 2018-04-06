"use strict";

const express = require('express');
const router = express.Router();
const api_key = 'key-f7f6501d5e7940f941c0ac33d20e40a7';
const domain = 'sandboxc840785fd6244d16981cb9f613d95dca.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = (knex) => {

  function getPolls(id) {
    return knex
      .select('options.*','polls.name as pollname','polls.email as email')
      .from('options')
      .join('polls', 'polls.id', '=', 'options.poll_id')
      .then(function(options) {
        const polls = [];
        for (let i=0; i<options.length; i++) {
          const existingPoll = polls.find(function(poll){return poll.poll_id === options[i].poll_id});
          if(!existingPoll) {
            // insert new poll
            let poll = {
              poll_id: options[i].poll_id,
              pollname:options[i].pollname ,
              email: options[i].email,
              options: [
               { optionid: options[i].id,rank: options[i].rank, name: options[i].name }
              ]
            };
            polls.push(poll);
          } else {
            // add option to existing poll
            let option = {
              optionid: options[i].id,rank: options[i].rank, name: options[i].name
            }
            existingPoll.options.push(option);
          }
        }
        return polls;
      });
    }
    
    function savePolls(data) {
      return knex('polls')
      .insert({
        name: data.name, 
        email: data.email, 
        created_at: new Date().toISOString()
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
      getPolls(req.params.id)
      .then((results) => {
        res.json(results);
      })
      .catch(function(err){
        res.send(err);
      })
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
    let useremail = req.body.email
    console.log(useremail);
      var data = {
        from: `Chill Poll <${useremail}>`,
        to: 'strangesm@gmail.com',
        cc:'mateuscbraga@gmail.com',
        subject: 'What to do on this friday ? (Title of the poll)',
        text: 'You just got asked about Netflix for this friday! (here will be the link to vote)'
        };
      mailgun.messages().send(data, function (error, body) {
        if (error) {
        console.log(error)
        }
      console.log(body);
      });

    let options = req.body;
    let optionArray = options.options;

    console.log(optionArray);

    savePolls(options)
    .returning('id')
    .then(function(id){  
      console.log(id);   
      optionArray.forEach((option) => {
        knex('options')
        .insert({poll_id: id, name: option})
        .then (function (result) {
        })
        .catch(function(err){})
      })
      // res.send();
    })
    .catch(function (err) {
      res.status(400).send(err);
    })
  })

  // router.post('/new', (req, res) => {
  //   let options = req.body;
  //   let optionArray = options.options;
  //   console.log("app",options);
  //   savePolls(options)
  //     .returning('id')
  //     .then(function(id){
  //       console.log("id",id);
  //       saveOptions(id, optionArray)
  //         .returning('*')
  //         .then(function (result){
  //           console.log(result);
  //           res.redirect("/all");
  //         })
  //     })
  //     .catch(function (err) {
  //       console.log(err)
  //       res.status(400).send(err);
  //     })
  // })

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
      res.send(result).render('edit');
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


