import { ArrowUp } from "lucide-react";

export function LoadingTile() {
  return (
    <div
      role="status"
      className="flex items-center justify-center h-[200px] w-[300px] rounded-lg overflow-hidden bg-gray-300 animate-pulse dark:bg-gray-700"
    >
      <svg
        className="w-full h-full text-gray-200 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 20"
      ></svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
//bg-(image:<custom-property>)
