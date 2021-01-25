exports.up = function (knex) {
  return knex.schema.createTable("foods", (table) => {
    table.increments("food_id");
    table.string("food_name").unique().notNullable();
  });
};

exports.down = function (knex) {
  return knex.sechema.dropTableIfExists("foods");
};
