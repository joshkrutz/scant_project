import { useState, useEffect } from "react";

export default function Graph({ nodes, edges }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [dashOffset, setDashOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDashOffset((prev) => prev + 1);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // node position
  const layout = {
    1: { x: 300, y: 50 }, // GPS IIIF SV1
    2: { x: 200, y: 200 }, // SAIC
    3: { x: 400, y: 200 }, // Lockheed Martin
    4: { x: 300, y: 350 }, // Tech Reports
  };

  const W = 600;
  const H = 500;
  const toRTL = ({ x, y }) => ({ x: W - y, y: x });

  return (
    <svg width={W} height={H} style={{ border: "1px solid black" }}>
      {edges.map((edge, index) => {
        const sourcePos = toRTL(layout[edge.source]);
        const targetPos = toRTL(layout[edge.target]);

        // control points for the curve -- aiming for S-shaped like the tree graph one
        const midX = (sourcePos.x + targetPos.x) / 2;
        const c1x = midX;
        const c1y = sourcePos.y;
        const c2x = midX;
        const c2y = targetPos.y;

        // Cubic Bezier curve
        const edgePath = `
          M ${sourcePos.x},${sourcePos.y}
          C ${c1x},${c1y} ${c2x},${c2y} ${targetPos.x},${targetPos.y}
        `;

        return (
          <path
            key={index}
            d={edgePath}
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeDasharray="6,6"
            strokeDashoffset={dashOffset}
          />
        );
      })}

      {nodes.map((node) => {
        const pos = toRTL(layout[node.id]);

        return (
          <g key={node.id} onClick={() => setSelectedNode(node)}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={10}
              fill={selectedNode?.id === node.id ? "green" : "black"}
            />
            <text
              x={pos.x}
              y={pos.y + 30}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="black"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
