
exports.up = function(knex) {
  return knex.schema.hasTable("pm_posts").then(exists => {
      if(!exists) {
          return knex.schema.createTable("pm_posts", tbl => {
              tbl.increments("id"),
              tbl.integer("pm_id").unsigned().references("id").inTable("private_messages").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
              tbl.integer("author").unsigned().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
              tbl.text("content", "mediumtext").notNullable(),
          })
      }
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("pm_posts")
};
