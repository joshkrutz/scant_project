/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('locations').del()
  await knex('locations').insert([
    { Lat: '10',Long: '10','Mailing Address':'415 Douglus St El Segundo ', Country: 'US CA'},
    { Lat: '20',Long: '20','Mailing Address':'CO Springs', Country: 'US CO'},
    { Lat: '30',Long: '30','Mailing Address':'Vandenburg', Country: 'US CA'},
    // table.string("Lat");
    // table.string("Long");
    // table.string("Mailing Address");
    // table.string("Country");
  ]);
};
