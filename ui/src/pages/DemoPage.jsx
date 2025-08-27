import useSWR from "swr";
import Graph from "../components/Graph";

export default function DemoPage() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8080/tree/1",
    (url) => fetch(url).then((res) => res.json())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading tree</div>;

  return <Graph treeData={data} />;
}

/* for reference:

app.get("/tree/:product_id", async (req, res) => {
  const [product, pairs, players] = await Promise.all([
    knex("end_product").select("*").where("id", "=", req.params.product_id),
    knex("player_node_join")
      .select("*")
      .where("end_product_id", "=", req.params.product_id)
      .catch((err) => res.status(400).json(err)),
    knex("player_node").select("*"),
  ]);

  */
