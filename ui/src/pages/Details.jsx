import { GraphToggle } from "../components/GraphToggle.jsx";
import { DetailPanel } from "../components/DetailPanel.jsx";
import { NodeGraph } from "../components/NodeGraph.jsx";

export function Details() {
  return (
    <div className="max-w-[800px] w-[75%] flex flex-col justify-center items-start">
      <GraphToggle className="w-full bg-green-500 " />
      <div className="flex w-full">
        <NodeGraph />
        <DetailPanel />
      </div>
    </div>
  );
}
