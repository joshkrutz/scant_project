import { Tile } from "./Tile.jsx";
import { LoadingTile } from "./LoadingTile.jsx";

export function Gallery({ data, isLoading }) {
  return (
    <div className="flex flex-wrap gap-6 m-4 justify-center items-center">
      {isLoading &&
        data.map((dataTile, index) => {
          return <LoadingTile key={index} />;
        })}

      {!isLoading &&
        data.map((dataTile, index) => {
          return <Tile key={index} data={dataTile} />;
        })}
    </div>
  );
}
