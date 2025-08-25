import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  //  const [theme, setthemeString] = useState("dark");

  let Icon = Moon;
  if (theme === "light") {
    Icon = Sun;
  }

  return (
    <button onClick={() => toggleTheme()}>
      <Icon />
    </button>
  );
}
