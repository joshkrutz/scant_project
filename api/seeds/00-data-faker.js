const { faker } = require("@faker-js/faker");

// Okay so basic idea, we need to create these tables in sequential order
// I.E. if every company has a location, we first have to generate all locations
// and then generate a company
// This current code is from my last project that used faker... so ignore most of it, i just needed a base

// Thinking out loud... i am going to get all the tables from psql and then dive into them to see which ones are stand alone... to decide what order we need to seed them

// Step 1) Use migration order when faking your data (we need to fake in the same order)
// Step 2) Make first faker function for the first migration file (aka Location)
// The idea for this function is it generates 1 JSON record. okiedoke
// Where in faker js are you finding the function references? oh okay lol
// rn i have not used faker, just setting up. So like my thought process is, first we need to set up an object that knex can read and understand aka the attributes of this object match the column names that the migration set up. we will actually use faker when we are putting data into these attributes

function generateLocation() {
  return {
    Lat: faker.location.latitude(),
    Long: faker.location.longitude(),
    "Mailing Address": faker.location.streetAddress(),
    Country: faker.location.country(),
  };
}

// In Faker Company now...
function generatePlayer(location_id) {
  return {
    name: faker.company.name(),
    description: faker.company.catchPhrase(),
    clearance: faker.helpers.arrayElement([
      "UNCLASS",
      "CUI",
      "SECRET",
      "TS",
      "TS-SCI",
    ]),
    location_id: location_id,
    risk_rating: faker.number.int(10, 1),
    risk_description: faker.word.adjective(),
    affiliation: faker.helpers.arrayElement(["CTR", "SUB", "GOV", "OTHER"]),
    image_url: faker.image.avatar(),
  };
}

function generateEndProduct(player_id) {
  return {
    name: faker.commerce.productName(),
    product_description: faker.commerce.productDescription(),
    generation: faker.helpers.arrayElement(["I", "IIIF", "2", ""]),
    image_url: faker.image.urlPicsumPhotos(),
    last_node_id: player_id,
  };
}

function generatePlayerNodeJoin(parent_id, child_id, final_product_id) {
  return {
    parent_id: parent_id,
    child_id: child_id,
    end_product_id: final_product_id,
  };
}

function generateBillOfLading(product, pair_id) {
  const start_date = faker.date.anytime();

  return {
    product_name: product.name,
    product_image_URL: product.image_url,
    quantity: Math.floor(Math.random() * 3000) + 1,
    pair_id: pair_id,
    start_date: start_date,
    end_date: faker.date.future({ years: 1, refDate: start_date }),
  };
}

function generateSequentialChain(
  length = 1,
  numberOfBills = 1,
  locations = [],
  players = [],
  player_connections = [],
  bills = [],
  products = []
) {
  const end_product_id = products.length + 1;

  locations.push(generateLocation());
  players.push(generatePlayer(locations.length));
  products.push(generateEndProduct(players.length));

  for (let i = 1; i < length; i++) {
    child_step_id = players.length;
    // Work backwards from first product created... add the previous step
    locations.push(generateLocation());
    players.push(generatePlayer(locations.length));
    parent_step_id = players.length;
    products.push(generateEndProduct(parent_step_id));

    // Add the connection
    player_connections.push(
      generatePlayerNodeJoin(parent_step_id, child_step_id, end_product_id)
    );

    // Add bills between parent/child for the newly generated product
    for (let j = 0; j < numberOfBills; j++) {
      bills.push(
        generateBillOfLading(
          products[products.length - 1],
          player_connections.length
        )
      );
    }
  }
  return [locations, players, products, player_connections, bills];
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const NUMBER_OF_END_PRODUCTS = 20;
  const MAX_DEPTH = 3;
  const NUM_BILLS = 3;
  let locations = [];
  let players = [];
  let products = [];
  let player_connections = [];
  let bills = [];

  for (let i = 0; i < NUMBER_OF_END_PRODUCTS; i++) {
    const [
      new_locations,
      new_players,
      new_products,
      new_player_connections,
      new_bills,
    ] = generateSequentialChain(
      Math.floor(Math.random() * MAX_DEPTH) + 1,
      NUM_BILLS,
      locations,
      players,
      player_connections,
      bills,
      products
    );

    locations = new_locations;
    players = new_players;
    products = new_products;
    player_connections = new_player_connections;
    bills = new_bills;
  }

  // Deletes ALL existing entries
  await knex("bill_of_lading").del();
  await knex("player_node_join").del();
  await knex("end_product").del();
  await knex("player_node").del();
  await knex("locations").del();

  await knex("locations").insert(locations);
  await knex("player_node").insert(players);
  await knex("end_product").insert(products);
  await knex("player_node_join").insert(player_connections);
  await knex("bill_of_lading").insert(bills);
};
