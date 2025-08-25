import { Logo } from "./Logo.jsx";
import { SearchBar } from "./SearchBar.jsx";

export function Header() {
  return (
    <div className="flex gap-4">
      <Logo />
      <SearchBar />
    </div>
  );
}
