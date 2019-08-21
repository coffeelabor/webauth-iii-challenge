exports.up = function(knex) {
  return knex.schema
    .createTable("departments", dept => {
      dept.increments();
      dept.string("name", 255).notNullable();
      dept.string("description", 500);
    })
    .createTable("positions", post => {
      post.increments();
      post.string("name", 255).notNullable();
      post.string("description", 500);
    })
    .createTable("users", users => {
      users.increments();

      users
        .string("username", 128)
        .notNullable()
        .unique();
      users.string("password", 128).notNullable();
      users
        .integer("departments_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("departments")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      users
        .integer("positions_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("positions")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("positions")
    .dropTableIfExists("departments");
};
