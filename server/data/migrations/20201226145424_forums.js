
exports.up = function(knex) {
    return knex.schema.hasTable("forums").then(exists => {
        if(!exists) {
            return knex.schema.createTable("forums", tbl => {
                tbl.increments("id"),
                tbl.string("name").unique().notNullable(),
                tbl.varchar("description", 255).notNullable(),
                tbl.integer("category_id").unsigned().references("id").inTable("categories").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
                tbl.boolean("is_subforum").defaultTo(false),
                tbl.integer("parent_forum").unsigned().references("id").inTable("forums").onUpdate("CASCADE").onDelete("CASCADE")
            })
        }
    })
};

exports.down = function(knex) {
      return knex.schema.dropTableIfExists("forums")
};
