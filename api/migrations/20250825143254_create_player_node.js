/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  console.log("Migrating...player_node");
  return knex.schema.createTable("player_node", (table) => {
  table.increments("id");
  table.string('name');
  table.string('description');
  table.string('clearance');
  table.integer('location_id');
  table.foreign('location_id').references('locations.id');
  table.integer('risk_rating');
  table.string('risk_description');
  table.string('affiliation');
  table.string('image_url');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('player_node',table => {
    table.dropForeign('location_id')

  })
    .then(function(){
      return knex.schema.dropTableIfExists('player_node');
    })
};
