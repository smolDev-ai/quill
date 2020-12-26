exports.up = function(knex) {
  return knex.schema.hasTable('users').then(exists => {
      if(!exists) {
          return knex.schema.createTable('users', tbl => {
              tbl.increments("id"),
              tbl.string("username").unique().notNullable(),
              tbl.string("email").unique(),
              tbl.string("password").notNullable();
              tbl.string("role").notNullable();
          })
      }
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('users');
};

