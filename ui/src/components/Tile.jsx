import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

export function Tile({ data }) {
  return (
    <Link to={`/product/${data.id}`}>
      <div className="select-none h-[200px] w-[300px] rounded-lg overflow-hidden flex flex-col justify-center items-center">
        <div
          className={`w-full flex-1`}
          style={{
            backgroundImage: `url(${data.image})`,
            backgroundSize: `cover`,
            backgroundPosition: `bottom center`,
          }}
        ></div>

        <div className="dark:bg-[var(--foreground)] bg-[var(--foreground-light)] gap-3 w-full flex justify-center items-center p-2">
          <ArrowUp className="stroke-[var(--trendup)]" />
          <h2>{data.product_str}</h2>
        </div>
      </div>
    </Link>
  );
}
//bg-(image:<custom-property>)
