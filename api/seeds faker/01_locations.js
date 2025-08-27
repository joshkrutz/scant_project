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
      Lat: faker.location.latitude(),
      Long: faker.location.longitude(),
      'Mailing Address': faker.location.streetAddress()+
      ' '+faker.location.city()+' '+faker.location.state()+
      ' '+faker.location.zipCode(),
      Country: 'US'};
    data.push(mock);
  }
  await knex('locations').del()
  await knex('locations').insert(
    data
  );
};
