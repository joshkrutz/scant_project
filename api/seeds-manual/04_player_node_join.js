/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('player_node_join').del()
  await knex('player_node_join').insert([
    { parent_id: '1',child_id: '2',end_product_id:'1'},
    { parent_id: '2',child_id: '3',end_product_id:'1'},

  //   table.integer('parent_id');
  // table.foreign('parent_id').references('player_node.id');
  // table.integer('child_id');
  // table.foreign('child_id').references('player_node.id');
    // table.integer('end_product_id');
  // table.foreign('end_product_id').references('end_product.id');
  ]);
};
