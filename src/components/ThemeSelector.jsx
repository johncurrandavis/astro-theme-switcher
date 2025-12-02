import { useState, useEffect } from "preact/hooks";
import { themes } from "../lib/themes.js";

export default function ThemeSelector() {
  const [theme, setTheme] = useState("warmVintage");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme ? savedTheme : prefersDark ? "darkElegant" : "warmVintage";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const colors = themes[theme].colors;
    root.classList.add("theme-transition");
    for (const key in colors) root.style.setProperty(key, colors[key]);
    const timeout = setTimeout(() => root.classList.remove("theme-transition"), 1200);
    localStorage.setItem("theme", theme);
    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="px-3 py-1 rounded text-sm font-medium outline-none hover:shadow-md focus:shadow-lg"
      style={{
        backgroundColor: "hsl(var(--card))",
        color: "hsl(var(--card-foreground))",
        borderColor: "hsl(var(--border))",
      }}
    >
      {Object.keys(themes).map((key) => (
        <option key={key} value={key}>
          {themes[key].name}
        </option>
      ))}
    </select>
  );
}
