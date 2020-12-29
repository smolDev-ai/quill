
exports.up = function(knex) {
  return knex.schema.hasTable('roles_users').then(exists => {
      if(!exists) {
          return knex.schema.createTable('roles_users', tbl => {
              tbl.primary(['user_id', 'role_id']),
              tbl.integer("user_id").unsigned().notNullable().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE"),
              tbl.integer("role_id").unsigned().notNullable().references("id").inTable("roles").onUpdate("CASCADE").onDelete("CASCADE")
          })
      }
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('roles_users')
};
