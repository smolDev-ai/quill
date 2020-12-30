
exports.up = function(knex) {
  return knex.schema.hasTable('roles').then(exists => {
      if(!exists) {
          return knex.schema.createTable('roles', tbl => {
              tbl.increments('id'),
              tbl.string('name').notNullable(),
              tbl.boolean("makeCategories").defaultTo(false),
              tbl.boolean("makeForums").defaultTo(false),
              tbl.boolean("makeThreads").defaultTo(true),
              tbl.boolean("makePosts").defaultTo(true),
              tbl.boolean("makeSubForums").defaultTo(false),
              tbl.boolean("makeRoles").defaultTo(false),
              tbl.boolean("deleteSubForums").defaultTo(false),
              tbl.boolean("deletePosts").defaultTo(false),
              tbl.boolean("deleteThreads").defaultTo(false),
              tbl.boolean("deleteForums").defaultTo(false),
              tbl.boolean("deleteCategories").defaultTo(false),
              tbl.boolean("editRoles").defaultTo(false),
              tbl.boolean("deleteRoles").defaultTo(false),
              tbl.boolean("editUserRoles").defaultTo(false),
              tbl.boolean("isBannable").defaultTo(true)
          })
      }
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('roles');
};
