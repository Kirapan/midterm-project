 exports.seed = function(knex, Promise) {
  return knex('votes').del()
    .then(function () {
      return Promise.all([
        knex('votes').insert({id: 1, option_id:1, name: "Alice",points: 1}),
        knex('votes').insert({id: 2, option_id:2, name: "Xiotchi",points: 3}),
        knex('votes').insert({id: 3, option_id:1, name: "Alice",points: 4})
      ]);
    });
};
