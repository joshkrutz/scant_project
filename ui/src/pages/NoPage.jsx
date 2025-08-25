import { useTheme } from "../components/ThemeProvider";

export function NoPage() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "dark" && (
        <img
          className="max-w-[1024px] w-[50%]"
          src="./404_dark.png"
          alt="404 Page Not Found"
        />
      )}
      {theme !== "dark" && (
        <img
          className="max-w-[1024px] w-[50%]"
          src="./404_light.png"
          alt="404 Page Not Found"
        />
      )}
    </>
  );
}
