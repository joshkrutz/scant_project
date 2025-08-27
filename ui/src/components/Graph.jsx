import { useState, useEffect } from "react";

export default function Graph({ treeData, selectedNode, getProductDetails }) {
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

    nodes.unshift({ id: String(node.id), label: node.name });

    if (node.children) {
      for (let child of node.children) {
        edges.unshift({ source: String(node.id), target: String(child.id) });
        visit(child);
      }
    }
  }

  visit(treeData);

  const startYpos = 100;
  const nodeGap = 200;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node.x = 100;
    node.y = startYpos + i * nodeGap;
  }

  const W = 800;
  const H = 600;

  return (
    <svg width={W} height={H}>
      {edges.map((edge, index) => {
        const from = nodes.find((node) => node.id === edge.source);
        const to = nodes.find((node) => node.id === edge.target);

        const midY = (from.y + to.y) / 2;
        const path = `
            M ${from.x},${from.y}
            C ${from.x},${midY} ${to.x},${midY} ${to.x},${to.y}
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
          <g
            key={node.id}
            onClick={async () => {
              await getProductDetails(node.id);
            }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={10}
              fill={
                selectedNode?.player_node === node.label ? "green" : "black"
              }
            />
            <text
              x={node.x}
              y={node.y + 25}
              textAnchor="start"
              fontSize="12"
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
