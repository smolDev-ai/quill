
exports.up = function(knex) {
  return knex.schema.hasTable("categories").then(exists => {
      if(!exists) {
          return knex.schema.createTable("categories", tbl => {
              tbl.increments("id"),
              tbl.string("name").unique().notNullable(),
              tbl.boolean("is_rp").notNullable().defaultTo(false)
          })
      }
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("categories")
};
