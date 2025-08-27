import { useState, useEffect } from "react";

export default function Graph({ treeData }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [dashOffset, setDashOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDashOffset((prev) => prev + 1);
    }, 30);
    return () => clearInterval(timer);
  }, []);

  // walk recursively, put treeData into nodes/edges
  const nodes = [];
  const edges = [];

  function visit(node) {
    if (!node) return;

    nodes.push({ id: String(node.id), label: node.name });

    if (node.children) {
      for (let child of node.children) {
        edges.push({ source: String(node.id), target: String(child.id) });
        visit(child);
      }
    }
  }

  visit(treeData);

  const startXpos = 100;
  const nodeGap = 150;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node.x = startXpos + i * nodeGap;
    node.y = 100;
  }

  const W = 800;
  const H = 600;

  return (
    <svg width={W} height={H}>
      {edges.map((edge, index) => {
        const from = nodes.find((node) => node.id === edge.source);
        const to = nodes.find((node) => node.id === edge.target);

        const midX = (from.x + to.x) / 2;
        const path = `
          M ${from.x},${from.y}
          C ${midX},${from.y} ${midX},${to.y} ${to.x},${to.y}
        `; // blagggggghhh
        /*
            Start point (from x,y) ----  C1(upper: midx, fromY) C2(lower: midx, toY) ---- End point (to x, y)
            curve will S through C1 and C2
        */

        return (
          <path
            key={index}
            d={path}
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeDasharray="10, 10"
            strokeDashoffset={dashOffset}
          />
        );
      })}

      {nodes.map((node) => {
        return (
          <g key={node.id} onClick={() => setSelectedNode(node)}>
            <circle
              cx={node.x}
              cy={node.y}
              r={10}
              fill={selectedNode?.id === node.id ? "green" : "black"}
            />
            <text
              x={node.x}
              y={node.y + 20}
              textAnchor="middle"
              fontSize="14"
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
