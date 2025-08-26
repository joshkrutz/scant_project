import { useEffect, useState } from "react";
import { AnimatedTree } from "react-tree-graph";
import { useTheme } from "./ThemeProvider";

const data = {
  name: "McRib",
  id: 1,

  children: [
    {
      name: "pickles",
      id: 2,
      children: [
        {
          name: "Cuc",
          id: 3,
          children: [
            {
              name: "Josh's Farm",
              id: 4,
            },
          ],
        },
        {
          name: "Vinegar",
          id: 5,
          children: [
            {
              name: "Josh's Farm2",
              id: 6,
            },
          ],
        },
      ],
    },
    {
      name: "Onion",
      id: 7,
    },
    {
      name: "Buns",
      id: 8,
      children: [
        {
          name: "Flour",
          id: 9,
        },
        {
          name: "Yeast",
          id: 10,
        },
      ],
    },
  ],
};

export function NodeGraph({ selectedNode, setSelectedNode }, props) {
  const [offSet, setoffSet] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const animatePath = setInterval(() => {
      setoffSet((prev) => prev + 1);
    }, 20);
    return () => {
      clearInterval(animatePath);
    };
  }, []);
  return (
    <div className="flex-1 bg-" {...props}>
      <AnimatedTree
        nodeProps={{
          fill: "yellow",
        }}
        gProps={{
          onClick: (event, node) => {
            setSelectedNode(node);
            console.log(node);
          },
        }}
        textProps={{
          y: "20",
          x: "20",
          fontWeight: "900",
          fill: theme === "dark" ? "var(--color)" : "var(--color-light)",
          stroke: "none",
        }} //controls background of text
        pathProps={{
          fill: "transparent",
          strokeDasharray: "10, 10",
          strokeDashoffset: offSet,
          strokeWidth: "2.5",
        }}
        data={data}
        height={400}
        width={400}
        direction="rtl"
      />
    </div>
  );
}
