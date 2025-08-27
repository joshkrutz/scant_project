/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  console.log("Migrating...player_node_join");
  return knex.schema.createTable("player_node_join", (table) => {
  table.increments("id");
  table.integer('parent_id');
  table.foreign('parent_id').references('player_node.id');
  table.integer('child_id');
  table.foreign('child_id').references('player_node.id');
  table.integer('end_product_id');
  table.foreign('end_product_id').references('end_product.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('player_node_join',table => {
    table.dropForeign('parent_id')
    table.dropForeign('child_id')
    table.dropForeign('end_product_id')
  })
    .then(function(){
      return knex.schema.dropTableIfExists('player_node_join');
    })
};
