import { GraphToggle } from "../components/GraphToggle.jsx";
import { DetailPanel } from "../components/DetailPanel.jsx";
import { NodeGraph } from "../components/NodeGraph.jsx";
import { useParams } from "react-router-dom";
import Graph from "../components/Graph.jsx";
import useSWR from "swr";
import { useEffect, useState } from "react";

export function Details() {
  const [selectedNode, setSelectedNode] = useState();
  const params = useParams();

  const getProductDetails = async (id) => {
    try {
      const details = await fetch(`http://localhost:8080/end_product/${id}`);
      if (!details.ok) throw new Error(`No bueno...`);
      const detailsJSON = await details.json();
      console.log(`detailsJSON:`, detailsJSON[0]);
      setSelectedNode(detailsJSON[0]);
    } catch (err) {
      console.log(`getProductDetails fail...`, err);
    }
  };

  // get product details
  // TODO replace this with context variable
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/tree/${params.id}`,
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    getProductDetails(params.id);
  }, []);

  if (isLoading) return <div>Is Loading...</div>;
  if (error) return <div>failed to load</div>;

  //const [selectedNode, setSelectedNode] = useState("McRib"); //use IDs with the
  // graph equivalent of this display
  return (
    <div className="max-w-[800px] w-[75%] h-[100%] flex flex-col justify-start items-start">
      {/* <GraphToggle className="w-full bg-green-500 " /> */}
      <div className="flex flex-1 w-full">
        <Graph
          treeData={data}
          selectedNode={selectedNode}
          getProductDetails={getProductDetails}
        />
        <DetailPanel selectedNode={selectedNode} />
      </div>
    </div>
  );
}
