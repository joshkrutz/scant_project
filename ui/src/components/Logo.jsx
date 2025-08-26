import { Link } from "react-router";

export function Logo() {
  return (
    <Link to="/">
      <img className="max-h-[50px]" src="/logo.png" alt="SCANT logo"></img>
    </Link>
  );
}
