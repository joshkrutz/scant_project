import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.jsx";

export function Layout() {
  return (
    <>
      <Header />
      <div className="flex flex-col h-screen justify-start items-center bg-[var(--background-light)] dark:bg-[var(--background)] text-[var(--color-light)] dark:text-[var(--color)] stroke-[var(--color-light)] dark:stroke-[var(--color)]">
        <Outlet />
      </div>
    </>
  );
}
