import { GraphToggle } from "../components/GraphToggle.jsx";
import { DetailPanel } from "../components/DetailPanel.jsx";
import { NodeGraph } from "../components/NodeGraph.jsx";
import { useParams } from "react-router-dom";
import useSWR from "swr";

export function Details() {
  const product_id = useParams().id;

  // get product details
  // TODO replace this with context variable
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/end_product/${product_id}`,
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((json) => json[0])
  );

  if (isLoading) return <div>Is Loading...</div>;
  if (error) return <div>failed to load</div>;

  //const [selectedNode, setSelectedNode] = useState("McRib"); //use IDs with the
  // graph equivalent of this display
  return (
    <div className="max-w-[800px] w-[75%] h-[100%] flex flex-col justify-start items-start">
      {/* <GraphToggle className="w-full bg-green-500 " /> */}
      <div className="flex flex-1 w-full">
        <NodeGraph
          selectedNode={data.product_str}
          setSelectedNode={data.product_str}
        />
        <DetailPanel selectedNode={data} />
      </div>
    </div>
  );
}
