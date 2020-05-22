
exports.up = function(knex) {
  return knex.schema.createTable('users_room', table=>{
      table.increments();

      table.string('user_id').notNullable();
      table.foreign('user_id').references('id').inTable('users');

      table.string('room_id').notNullable();
      table.foreign('room_id').references('id').inTable('rooms');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_room');
};
