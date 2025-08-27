import Graph from "../components/Graph";

const nodes = [
  { id: "1", label: "GPS IIIF SV1" },
  { id: "2", label: "SAIC" },
  { id: "3", label: "Lockheed Martin" },
  { id: "4", label: "Tech Reports" },
];

// trying for diamond
const edges = [
  { source: "2", target: "4" }, // SAIC - Tech Reports
  { source: "3", target: "4" }, // Lockheed - Tech Reports
  { source: "1", target: "2" }, // GPS - SAIC
  { source: "1", target: "3" }, // GPS - Lockheed
];

export default function DemoPage() {
  return (
    <div>
      <Graph nodes={nodes} edges={edges} />
    </div>
  );
}
