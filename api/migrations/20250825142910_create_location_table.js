/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  console.log("Migrating...Locations");

  return knex.schema.createTable("locations", (table) => {
    table.increments("id");
    table.string("Lat");
    table.string("Long");
    table.string("Mailing Address");
    table.string("Country");
    // table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("locations");
};