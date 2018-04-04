exports.seed = function(knex, Promise) {
  return knex('options').del()
    .then(function () {
      return Promise.all([
        knex('options').insert({id: 1, name:'Avengers',rank: 1, poll_id: 1}),
        knex('options').insert({id: 2, name:'Pacific Rim',rank: 2, poll_id: 1}),
        knex('options').insert({id: 3, name:'Sushi',rank: 1, poll_id: 2})
      ]);
    });
};
