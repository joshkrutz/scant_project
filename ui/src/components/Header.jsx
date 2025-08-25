import { Logo } from "./Logo.jsx";
import { SearchBar } from "./SearchBar.jsx";
import { ThemeToggle } from "./ThemeToggle.jsx";

export function Header() {
  return (
    <div className="flex gap-4 justify-between bg-[var(--background-light)] dark:bg-[var(--background)] text-[var(--color-light)] dark:text-[var(--color)] stroke-[var(--color-light)] dark:stroke-[var(--color)] p-4">
      <Logo />
      <SearchBar />
      <ThemeToggle />
    </div>
  );
}
