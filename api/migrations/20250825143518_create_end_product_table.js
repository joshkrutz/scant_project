/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  console.log("Migrating...End_Product");
  return knex.schema.createTable("end_product", (table) => {
  table.increments("id");
  table.string('name');
  table.string('product_description');
  table.string('generation');
  table.integer('last_node_id');
  table.foreign('last_node_id').references('player_node.id');
  table.string('image_url');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('end_product',table => {
    table.dropForeign('last_node_id')

  })
    .then(function(){
      return knex.schema.dropTableIfExists('end_product');
    })
};