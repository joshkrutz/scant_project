import { useEffect, useState } from "react";
import { AnimatedTree } from "react-tree-graph";
import { useTheme } from "./ThemeProvider";

const data = {
  name: "Parent",
  children: [
    {
      name: "Child One",
    },
    {
      name: "Child Two",
    },
  ],
};

export function NodeGraph(props) {
  const [offSet, setoffSet] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const animatePath = setInterval(() => {
      setoffSet((prev) => prev - 1);
      console.log(offSet);
    }, 20);
    return () => {
      clearInterval(animatePath);
    };
  }, []);
  return (
    <div className="flex-1 bg-" {...props}>
      <AnimatedTree
        nodeProps={{ fill: "yellow" }}
        textProps={{
          y: "20",
          x: "-10",
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
      />
    </div>
  );
}
