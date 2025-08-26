import { GraphToggle } from "../components/GraphToggle.jsx";
import { DetailPanel } from "../components/DetailPanel.jsx";
import { NodeGraph } from "../components/NodeGraph.jsx";
import { useState } from "react";

export function Details() {
  const [selectedNode, setSelectedNode] = useState("McRib");
  return (
    <div className="max-w-[800px] w-[75%] h-[100%] flex flex-col justify-start items-start">
      {/* <GraphToggle className="w-full bg-green-500 " /> */}
      <div className="flex flex-1 w-full">
        <NodeGraph
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
        />
        <DetailPanel selectedNode={selectedNode} />
      </div>
    </div>
  );
}
