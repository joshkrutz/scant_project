/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bill_of_lading').del()
  await knex('bill_of_lading').insert([
    { product_name: 'tech reports',product_image_URL:'https://',quantity:3000,pair_id:'1',start_date:'20120101',end_date:'20181001'},
    { product_name: 'GPSIIIF',product_image_URL:'https://',quantity:1,pair_id:'2',start_date:'20181001',end_date:'20251001'},
  //   table.string('product_name');
  // table.string('product_image_URL');
  // table.integer('quantity');
  // table.integer('pair_id');
  // table.foreign('pair_id').references('player_node_join.id');
  // table.date('start_date');
  // table.date('end_date');
  ]);
};
