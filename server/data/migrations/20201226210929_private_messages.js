
exports.up = function(knex) {
  return knex.schema.hasTable("private_messages").then(exists => {
      if(!exists) {
          return knex.schema.createTable("private_messages", tbl => {
              tbl.increments("id"),
              tbl.integer("creator").unsigned().references("id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
              tbl.string("title").notNullable(),
          })
      }
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("private_messages")
};
