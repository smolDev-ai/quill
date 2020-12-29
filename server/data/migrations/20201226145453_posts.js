
exports.up = function(knex) {
  return knex.schema.hasTable("posts").then(exists => {
      if(!exists) {
          return knex.schema.createTable("posts", tbl => {
              tbl.increments("id"),
              tbl.integer("author").unsigned().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
              tbl.integer("thread").unsigned().references("id").inTable("threads").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
              tbl.text("content", 'mediumtext').notNullable()
          })
      }
  })
};

exports.down = function(knex) {
      return knex.schema.dropTableIfExists("posts")

};
