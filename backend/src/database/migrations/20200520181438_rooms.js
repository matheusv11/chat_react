
exports.up = function(knex) {
  return knex.schema.createTable('rooms', table=>{
    table.increments();

    table.string('name').notNullable();

    //Identificar usuarios dessa sala ou só o admin
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('rooms');
};
