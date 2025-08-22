import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [names, setNames] = useState(["loading"]);

  useEffect(() => {
    if (names[0] !== "loading") return;
    const getNames = async () => {
      try {
        const data = await fetch("http://localhost:8080/", {
          
        });
        if (!data.ok) throw new Error("Weird");
        const dataJson = await data.json();
        setNames(dataJson.map((item) => item.colName));
      } catch (err) {
        console.log(err.message);
      }
    };
    getNames();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{names.join(", ")} Workshop</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
