// import { selectedNode, data } from "react-router-dom";
import { useEffect, useState } from "react";
import useSWR from "swr";

const getNodeDetails = (selectedNode) => {
  const RECORDS = [
    { time: new Date(Date.now()), quantity: Math.random() * (10 - 1) + 1 },
    {
      time: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      quantity: Math.random() * (10 - 1) + 1,
    },
    {
      time: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
      quantity: Math.random() * (10 - 1) + 1,
    },
  ];

  return {
    image:
      "https://s7d1.scene7.com/is/image/mcdonalds/DC_201910_0010_McRib_1564x1564-1:product-header-mobile?wid=1313&hei=1313&dpr=off",
    product_str: selectedNode,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam dignissimos voluptas quaerat quidem odio saepe aspernatur tempore porro eum, dolores voluptatem repellat nobis eaque quae animi assumenda, deserunt illum quas.",
    records: RECORDS,
    rateDifference: RECORDS[0].quantity - RECORDS[1].quantity,
  };
};

async function addTransactionHistory(origData) {
  try {
    const pair_data = await fetch(
      `http://localhost:8080/player_node_join/child/${origData.player_node}/end_id/${origData.id}`
    );
    const pair_json = await pair_data.json();
    console.log(pair_json);

    const bill_of_lading_data = await fetch(
      `http://localhost:8080/bill_of_lading/pair_id/${pair_json[0]["join id"]}`
    );
    const b_o_l = await bill_of_lading_data.json();
    console.log(b_o_l);
    return b_o_l;

    //setData(newData);
  } catch (err) {
    console.log(err);
    //setError(err);
  } finally {
    //setIsLoading(false);
  }
}

export function DetailPanel({ selectedNode }, props) {
  const [bills, setBills] = useState();

  useEffect(() => {
    if (!selectedNode) {
      return;
    }
    console.log(selectedNode);
    async function populateTransactionHistory() {
      const temp = await addTransactionHistory(selectedNode);
      setBills(temp);
      console.log(temp);
    }
    populateTransactionHistory();
  }, [selectedNode]);

  return (
    <>
      {selectedNode && (
        <div className="select-none w-[600px] rounded-lg overflow-hidden flex flex-col justify-start items-start">
          <div
            className={`w-full flex-1 max-h-[300px]`}
            style={{
              backgroundImage: `url(${selectedNode.image})`,
              backgroundSize: `cover`,
              backgroundPosition: `bottom center`,
            }}
          ></div>

          <div className="dark:bg-[var(--foreground)] bg-[var(--foreground-light)] rounded-b-lg gap-3 w-full flex flex-col justify-center items-start p-2">
            <h2 className="w-full text-center text-2xl">
              <strong>{selectedNode.product_str}</strong>
            </h2>
            <details>
              <summary>
                <strong>Description:</strong>
              </summary>
              <p>{selectedNode.description}</p>
            </details>
            <p>
              <strong>Company: </strong>
              <span>{selectedNode.player_node}</span>
            </p>
            <p>
              <strong>Rate Difference: </strong>
              <span
                className={`${
                  selectedNode.rateDifference > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {200}
                {/* {selectedNode.rateDifference.toFixed(2)} */}
              </span>
            </p>

            {bills && (
              <table id="details-table">
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Quantity</th>
                </tr>

                {bills.map((item) => {
                  return (
                    <tr key={item["Bill id"]}>
                      <td>
                        {new Date(item["start date"]).toLocaleDateString()}
                      </td>
                      <td>{new Date(item["end date"]).toLocaleDateString()}</td>
                      <td>{Math.floor(item["product quantity"])}</td>
                    </tr>
                  );
                })}
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
}
