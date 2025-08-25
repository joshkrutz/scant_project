import { useEffect, useState } from "react";
import useSWR from "swr";
import { Gallery } from "../components/Gallery.jsx";

export function Home() {
  // const {data, error, isLoading} = useSWR('/fill me in', fetcher);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    try {
      setData([
        {
          id: 1,
          product_str: "McRib",
          quantity: 150,
          image:
            "https://s7d1.scene7.com/is/image/mcdonalds/DC_201910_0010_McRib_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
          mission: "Feed People",
          player_node: 1,
        },
        {
          id: 2,
          product_str: "BigMac",
          quantity: 150,
          image:
            "https://s7d1.scene7.com/is/image/mcdonalds/DC_201910_0010_McRib_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
          mission: "Feed People",
          player_node: 1,
        },
        {
          id: 3,
          product_str: "McChicken",
          quantity: 150,
          image:
            "https://s7d1.scene7.com/is/image/mcdonalds/DC_201910_0010_McRib_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
          mission: "Feed People",
          player_node: 1,
        },
        {
          id: 4,
          product_str: "McFlurry",
          quantity: 150,
          image:
            "https://s7d1.scene7.com/is/image/mcdonalds/DC_201910_0010_McRib_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
          mission: "Feed People",
          player_node: 1,
        },
      ]);
    } catch (err) {
      setError(err);
    } finally {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  }, []);
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
