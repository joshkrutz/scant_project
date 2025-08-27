import { useEffect, useState } from "react";
import useSWR from "swr";
import { Gallery } from "../components/Gallery.jsx";

export function Home() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:8080/end_product",
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((json) => json)
  );

  if (error) return <div>failed to load</div>;
  return (
    <>
      <Gallery
        data={isLoading ? Array.from({ length: 20 }) : data}
        isLoading={isLoading}
      />
    </>
  );
}
