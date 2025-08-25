/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  console.log("Migrating...bill_of_lading");
  return knex.schema.createTable("bill_of_lading", (table) => {
  table.increments("id");
  table.string('product_name');
  table.string('product_image_URL');
  table.integer('quantity');
  table.integer('pair_id');
  table.foreign('pair_id').references('player_node_join.id');
  table.date('start_date');
  table.date('end_date');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('bill_of_lading',table => {
    table.dropForeign('pair_id')
  })
    .then(function(){
      return knex.schema.dropTableIfExists('bill_of_lading');
    })
};
