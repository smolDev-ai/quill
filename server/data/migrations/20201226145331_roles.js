
exports.up = function(knex) {
  return knex.schema.hasTable('roles').then(exists => {
      if(!exists) {
          return knex.schema.createTable('roles', tbl => {
              tbl.increments('id'),
              tbl.string('name');
          })
      }
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('roles');
};
