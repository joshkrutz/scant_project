import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex rounded-full justify-start items-center p-2 gap-2 bg-[var(--foreground-light)] dark:bg-[var(--foreground)] text-inherit stroke-inherit">
      <Search />
      <input className="border-none outline-none" placeholder="Search" />
    </div>
  );
}
