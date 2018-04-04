
exports.up = function(knex, Promise) {
  return knex.schema.createTable('votes', function(table){
    table.increments();
    table.integer('option_id').references('id').inTable('options');
    table.string('name');
    table.integer('points');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('votes');
};
