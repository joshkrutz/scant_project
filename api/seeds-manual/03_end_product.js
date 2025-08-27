/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("end_product").del();
  await knex("end_product").insert([
    {
      name: "GPS IIIF SV1",
      product_description: "GPS",
      generation: "IIIF",
      image_url: "./assets/GPS-IIIF.jpeg",
      last_node_id: "3",
    },

    //   table.increments("id");
    // table.string('sat_name');
    // table.string('mission');
    // table.string('generation');
    // table.integer('last_node_id');
    // table.foreign('last_node_id').references('player_node.id');
    // table.string('image_url');
  ]);
};
