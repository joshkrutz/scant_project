import { useEffect, useState } from "react";

export function DetailPanel({ selectedNode }, props) {
  const getNodeDetails = () => {
    return {
      image:
        "hhttps://s7d1.scene7.com/is/image/mcdonalds/DC_201910_0010_McRib_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
      product_str: selectedNode,
    };
  };
  const [data, setData] = useState();
  useEffect(() => {
    setData(getNodeDetails());
  }, [selectedNode]);
  return (
    <>
      {data && (
        <div className="select-none h-[200px] w-[300px] rounded-lg overflow-hidden flex flex-col justify-center items-center">
          <div
            className={`w-full flex-1`}
            style={{
              backgroundImage: `url(${data.image})`,
              backgroundSize: `cover`,
              backgroundPosition: `bottom center`,
            }}
          ></div>

          <div className="bg-[var(--foreground)] gap-3 w-full flex justify-center items-center p-2">
            <h2>{data.product_str}</h2>
          </div>
        </div>
      )}
    </>
  );
}
