const express = require("express");

const app = express();
const port = 8080;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.get("/", (req, res) => {
  res.send('Application up and running.');
});

app.get("/locations", (req, res) => {
  knex('locations')
    .select('*')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/player_nodes", (req, res) => {
  knex('player_node')
    .select('player_node.id as player id')
    .select('player_node.name as player name')
    .select('player_node.description as player description')
    .select('player_node.clearance as player clearance')
    .select('player_node.risk_rating as player risk level')
    .select('player_node.risk_description as player risk description')
    .select('player_node.affiliation as player affiliation')
    .select('player_node.image_url as player URL')
    .select('locations.Mailing Address as Address')
    .join('locations','player_node.location_id','=','locations.id')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/end_product", (req, res) => {
  knex('end_product')
    .select('end_product.id as End Product id')
    .select('end_product.sat_name as Sat Name')
    .select('end_product.mission as Mission description')
    .select('end_product.generation as Sat Generation')
    .select('end_product.image_url as Sat URL')
    .select('player_node.name as Last Node Name')
    .join('player_node','end_product.last_node_id','=','player_node.id')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/player_node_join", (req, res) => {
  knex('player_node_join')
    .select('player_node_join.id as join id')
    .select('p.name as Parent name')
    .select('c.name as Child name')
    .select('end_product.sat_name as Sat name')
    .join('player_node as p','p.id','=','player_node_join.parent_id')
    .join('player_node as c','c.id','=','player_node_join.child_id')
    .join('end_product','end_product.id','=','player_node_join.end_product_id')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/bill_of_lading", (req, res) => {
  knex('bill_of_lading')
    .select('bill_of_lading.id as Bill id')
    .select('bill_of_lading.product_name as product name')
    .select('bill_of_lading.quantity as product quantity')
    .select('bill_of_lading.start_date as start date')
    .select('bill_of_lading.end_date as end date')
    .select('player_node_join.parent_id as Parent')
    .select('player_node_join.child_id as Child')
    .join('player_node_join','bill_of_lading.pair_id','=','player_node_join.id')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/locations/:id", (req, res) => {
  knex('locations')
    .select('*')
    .where('locations.id','=',req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/locations/address/:address", (req, res) => {
  knex('locations')
    .select('*')
    .where('locations.Mailing Address','=',req.params.address)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/player_nodes/:id", (req, res) => {
  knex('player_node')
    .select('player_node.id as player id')
    .select('player_node.name as player name')
    .select('player_node.description as player description')
    .select('player_node.clearance as player clearance')
    .select('player_node.risk_rating as player risk level')
    .select('player_node.risk_description as player risk description')
    .select('player_node.affiliation as player affiliation')
    .select('player_node.image_url as player URL')
    .select('locations.Mailing Address as Address')
    .join('locations','player_node.location_id','=','locations.id')
    .where('player_node.id','=',req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/player_nodes/name/:name", (req, res) => {
  knex('player_node')
    .select('player_node.id as player id')
    .select('player_node.name as player name')
    .select('player_node.description as player description')
    .select('player_node.clearance as player clearance')
    .select('player_node.risk_rating as player risk level')
    .select('player_node.risk_description as player risk description')
    .select('player_node.affiliation as player affiliation')
    .select('player_node.image_url as player URL')
    .select('locations.Mailing Address as Address')
    .join('locations','player_node.location_id','=','locations.id')
    .where('player_node.name','=',req.params.name)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/end_product/:id", (req, res) => {
  knex('end_product')
    .select('end_product.id as End Product id')
    .select('end_product.sat_name as Sat Name')
    .select('end_product.mission as Mission description')
    .select('end_product.generation as Sat Generation')
    .select('end_product.image_url as Sat URL')
    .select('player_node.name as Last Node Name')
    .join('player_node','end_product.last_node_id','=','player_node.id')
    .where('end_product.id','=',req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/end_product/name/:name", (req, res) => {
  knex('end_product')
    .select('end_product.id as End Product id')
    .select('end_product.sat_name as Sat Name')
    .select('end_product.mission as Mission description')
    .select('end_product.generation as Sat Generation')
    .select('end_product.image_url as Sat URL')
    .select('player_node.name as Last Node Name')
    .join('player_node','end_product.last_node_id','=','player_node.id')
    .whereILike( 'end_product.sat_name',`%${req.params.name}%`)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/player_node_join/:id", (req, res) => {
  knex('player_node_join')
    .select('player_node_join.id as join id')
    .select('p.name as Parent name')
    .select('c.name as Child name')
    .select('end_product.sat_name as Sat name')
    .join('player_node as p','p.id','=','player_node_join.parent_id')
    .join('player_node as c','c.id','=','player_node_join.child_id')
    .join('end_product','end_product.id','=','player_node_join.end_product_id')
    .where('player_node_join.id','=',req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/player_node_join/parent/:name", (req, res) => {
  knex('player_node_join')
    .select('player_node_join.id as join id')
    .select('p.name as Parent name')
    .select('c.name as Child name')
    .select('end_product.sat_name as Sat name')
    .join('player_node as p','p.id','=','player_node_join.parent_id')
    .join('player_node as c','c.id','=','player_node_join.child_id')
    .join('end_product','end_product.id','=','player_node_join.end_product_id')
    .where('p.name ','=',req.params.name)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/player_node_join/child/:name", (req, res) => {
  knex('player_node_join')
    .select('player_node_join.id as join id')
    .select('p.name as Parent name')
    .select('c.name as Child name')
    .select('end_product.sat_name as Sat name')
    .join('player_node as p','p.id','=','player_node_join.parent_id')
    .join('player_node as c','c.id','=','player_node_join.child_id')
    .join('end_product','end_product.id','=','player_node_join.end_product_id')
    .where('c.name ','=',req.params.name)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/bill_of_lading/:id", (req, res) => {
  knex('bill_of_lading')
    .select('bill_of_lading.id as Bill id')
    .select('bill_of_lading.product_name as product name')
    .select('bill_of_lading.quantity as product quantity')
    .select('bill_of_lading.start_date as start date')
    .select('bill_of_lading.end_date as end date')
    .select('player_node_join.parent_id as Parent')
    .select('player_node_join.child_id as Child')
    .join('player_node_join','bill_of_lading.pair_id','=','player_node_join.id')
    .where('bill_of_lading.id','=',req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});

app.get("/bill_of_lading/name/:name", (req, res) => {
  knex('bill_of_lading')
    .select('bill_of_lading.id as Bill id')
    .select('bill_of_lading.product_name as product name')
    .select('bill_of_lading.quantity as product quantity')
    .select('bill_of_lading.start_date as start date')
    .select('bill_of_lading.end_date as end date')
    .select('player_node_join.parent_id as Parent')
    .select('player_node_join.child_id as Child')
    .join('player_node_join','bill_of_lading.pair_id','=','player_node_join.id')
    .where('bill_of_lading.product_name','=',req.params.name)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json(err));
});


app.delete('/:table/:id',(req,res)=>{
  knex(req.params.table)
  .where(`${req.params.table}.id`,'=',req.params.id)
  .del()

  .then(data => res.status(200).json(data))
  .then(()=>console.log('done with the delete'))
  .catch((err) => res.status(400).json(err));
})

app.post('/:table',(req,res)=>{
  knex(req.params.table).insert(req.body)
  .then(()=>console.log('done with the insert'))
  .then(data => res.status(200).end())
  .catch((err) => res.status(400).json(err));
})

app.patch('/:table/:id',(req,res)=>{
  knex(req.params.table)
  .where(`${req.params.table}.id`,'=',req.params.id)
  .update(req.body)
  .then(()=>console.log('done with the patch'))
  .then(data => res.status(200).end())
  .catch((err) => res.status(400).json(err));
})


