
exports.up = function(knex) {
  return knex.schema.hasTable("message_participants").then(exists => {
      if(!exists) {
          return knex.schema.createTable("message_participants", tbl => {
              tbl.primary(["pm_id", "participant_id"]),
              tbl.integer("pm_id").unsigned().references("id").inTable("private_messages").onUpdate("CASCADE").onDelete("CASCADE").notNullable(),
              tbl.integer("participant_id").unsigned().references("id").inTable("users").onUpdate("CASCADE").onDelete("CASCADE").notNullable()
          })
      }
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("message_participants")

};
