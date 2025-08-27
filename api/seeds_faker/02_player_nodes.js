/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const { faker } = require('@faker-js/faker');
// import { faker } from '@faker-js/faker';

exports.seed = async function(knex) {
  // Deletes ALL existing entries

  var data =[];
  for(var i =0;i<100;i++){
    var mock ={
      name:faker.company.name() ,
      description:faker.company.catchPhrase(),
      clearance: 'TS/SCI/no foreign',
      location_id: faker.number.int(100,1),
      risk_rating:faker.number.int(10,1),
      risk_description: 'the subs are better at risk',
      affiliation:'CTR',
      image_url: 'https:notavaible'};
    data.push(mock);
  }
  await knex('player_node').del()
  await knex('player_node').insert(
    data
  );
};












// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> }
//  */
// exports.seed = async function(knex) {
//   // Deletes ALL existing entries
//   await knex('player_node').del()
//   await knex('player_node').insert([
//     { name: 'SAIC', description:'Makes the tech reports',clearance: 'TS/SCI/no foreign',location_id:'1',risk_rating:'7',risk_description: 'the subs are better at risk',affiliation:'Prime CTR',image_url: 'https:notavaible'},
//     { name: 'Lockheed Martin', description:'Makes the Sat',clearance: 'TS/SCI/no foreign',location_id:'2',risk_rating:'4',risk_description: 'they are all kind of suck',affiliation:'Prime CTR',image_url: 'https:notavaible'},
//     { name: 'SSC/AA', description:'LAUNCH',clearance: 'TS/SCI/no foreign',location_id:'3',risk_rating:'1',risk_description: 'FAA and Big Space Force watches them like HAWKS',affiliation:'GOV USSF SSC',image_url: 'https:notavaible'},

//   //   table.string('name');
//   // table.string('description');
//   // table.string('clearance');
//   // table.integer('location_id');
//   // table.foreign('location_id').references('locations.id');
//   // table.integer('risk_rating');
//   // table.string('risk_description');
//   // table.string('affiliation');
//   // table.string('image_url');
//   ]);
// };
