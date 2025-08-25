import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex rounded-full justify-start items-center bg-[var(--foreground)]">
      <Search />
      <input placeholder="Search" />
    </div>
  );
}
