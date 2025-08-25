import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.jsx";

export function Layout() {
  return (
    <>
      <Header />
      <div className="flex flex-col h-screen justify-start items-center">
        <Outlet />
      </div>
    </>
  );
}
