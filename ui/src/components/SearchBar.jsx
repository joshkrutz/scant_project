import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

export function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const { data, error, isLoading } = useSWR(
    "http://localhost:8080/all_products",
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((json) => json)
  );
  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  return (
    <div className="flex flex-col rounded-2xl bg-[var(--foreground-light)] dark:bg-[var(--foreground)] items-center justify-center relative focus-within:rounded-b-none">
      <div className="flex rounded-full justify-start items-center p-2 gap-2  text-inherit stroke-inherit">
        <Search />
        <input
          className="border-none outline-none"
          placeholder="Search"
          defaultValue={searchText}
          onFocus={() => {
            const searchResults = document.getElementById("search-results");
            searchResults.classList.remove("hidden");
          }}
          onBlur={() => {
            setTimeout(() => {
              const searchResults = document.getElementById("search-results");
              searchResults.classList.add("hidden");
              console.log("blurred");
            }, 500);
          }}
          onKeyUp={(e) => {
            const key = e.key;
            if (key === "Enter") {
              console.log("do something brother");
            } else {
              setSearchText(e.target.value);
            }
          }}
        />
      </div>
      {!isLoading && !error && data && (
        <div
          id="search-results"
          className="absolute bg-[var(--foreground-light)] dark:bg-[var(--foreground)] w-full hidden top-full rounded-b-2xl"
        >
          <div className="w-full border-t border-gray-500 "></div>
          <div className="w-full rounded-b p-2">
            <ul className="flex flex-col rounded-lg gap-2 w-full">
              {data
                .filter((item) => {
                  if (searchText === "") {
                    return true;
                  }
                  return item.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                })
                .map((item) => {
                  return (
                    <li className="rounded-lg hover:bg-[var(--foregroundAccent-light)] hover:dark:bg-[var(--foregroundAccent)] ">
                      <Link
                        to={`/product/${item.id}`}
                        className="w-full block pl-2 p-1"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
