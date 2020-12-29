
exports.up = function(knex) {
  return knex.schema.hasTable("threads").then(exists => {
      if(!exists) {
          return knex.schema.createTable("threads", tbl => {
              tbl.increments("id"),
              tbl.string("title"),
              tbl.integer("author").unsigned().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
              tbl.integer("forum").unsigned().references("id").inTable("forums").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
              tbl.boolean("is_sticky").defaultTo(false),
              tbl.boolean("is_locked").defaultTo(false)
          })
      }
  })
};

exports.down = function(knex) {
      return knex.schema.dropTableIfExists("threads")
};
