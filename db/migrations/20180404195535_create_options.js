
exports.up = function(knex, Promise) {
    return knex.schema.createTable('options', function (table) {
        table.increments();
        table.integer('poll_id').references('id').inTable('polls');;
        table.string('name');
        table.integer('rank');
    });
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('options');
};
