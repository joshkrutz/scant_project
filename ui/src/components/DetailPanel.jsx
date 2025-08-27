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

export function DetailPanel({ selectedNode }, props) {
  const data = getNodeDetails(selectedNode);

  return (
    <>
      {data && (
        <div className="select-none w-[300px] rounded-lg overflow-hidden flex flex-col justify-start items-start">
          <div
            className={`w-full flex-1 max-h-[300px]`}
            style={{
              backgroundImage: `url(${data.image})`,
              backgroundSize: `cover`,
              backgroundPosition: `bottom center`,
            }}
          ></div>

          <div className="dark:bg-[var(--foreground)] bg-[var(--foreground-light)] rounded-b-lg gap-3 w-full flex flex-col justify-center items-start p-2">
            <h2 className="w-full text-center text-2xl">
              <b>{data.product_str}</b>
            </h2>
            <details>
              <summary>
                <strong>Description:</strong>
              </summary>
              <p>{data.description}</p>
            </details>
            <p>
              <strong>Rate Difference: </strong>
              <span
                className={`${
                  data.rateDifference > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {data.rateDifference.toFixed(2)}
              </span>
            </p>

            <table id="details-table">
              <tr>
                <th>Date</th>
                <th>Quantity</th>
              </tr>

              {data.records.map((item) => {
                return (
                  <tr key={item.time}>
                    <td>{item.time.toLocaleDateString()} </td>
                    <td>{Math.floor(item.quantity)}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </>
  );
}
