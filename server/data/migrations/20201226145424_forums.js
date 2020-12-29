
exports.up = function(knex) {
    return knex.schema.hasTable("forums").then(exists => {
        if(!exists) {
            return knex.schema.createTable("forums", tbl => {
                tbl.increments("id"),
                tbl.string("name").unique().notNullable(),
                tbl.varchar("description", 255).notNullable(),
                tbl.integer("category_id").unsigned().references("id").inTable("categories").onUpdate("CASCADE").onDelete("CASCADE").notNullable()
                
            })
        }
    })
};

exports.down = function(knex) {
      return knex.schema.dropTableIfExists("forums")
};
