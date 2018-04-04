exports.seed = function(knex, Promise) {
  return knex('polls').del()
    .then(function () {
      return Promise.all([
        knex('polls').insert({id: 1, name: 'Friday Movie?', email:'mateus@braga.ca',created_at:'1995-08-21'}),
        knex('polls').insert({id: 2, name: 'Satuday Dinner', email:'xiaoqi@pan.ca',created_at:'1995-08-01'}),
        knex('polls').insert({id: 3, name: 'Christmas Party', email:'michael@stranges.ca',created_at:'1994-08-20'})
      ]);
    });
};
