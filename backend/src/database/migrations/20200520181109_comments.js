
exports.up = function(knex) {
    return knex.schema.createTable('comments', table=>{
        table.increments();

        table.string('comment').notNullable();

        table.string('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');

        table.string('room_id').notNullable();
        table.foreign('room_id').references('id').inTable('rooms');
        //Sala
            //Usuario
                //Por aqui posso verificar que user x pertence a sala x 
    })

};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
