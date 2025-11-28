import { useState, useEffect } from "preact/hooks";
import { themes } from "../lib/themes.js";

/* --------------------------------------------------
   Playground component
-------------------------------------------------- */
export default function ThemePlayground() {
  const [theme, setTheme] = useState("warmVintage");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const root = document.documentElement;
    const colors = themes[theme].colors;

    root.classList.add("theme-transition");
    for (const key in colors) root.style.setProperty(key, colors[key]);

    const timeout = setTimeout(() => root.classList.remove("theme-transition"), 1200);
    localStorage?.setItem("theme", theme);
    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <div
      className="min-h-screen transition-all duration-1000"
      style={{
        backgroundColor: `hsl(var(--background))`,
        color: `hsl(var(--foreground))`,
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-serif">Theme Playground</h1>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-3 py-2 rounded-md border text-sm font-medium outline-none hover:shadow-md transition-all"
            style={{
              backgroundColor: `hsl(var(--card))`,
              color: `hsl(var(--card-foreground))`,
              borderColor: `hsl(var(--border))`,
            }}
          >
            {Object.keys(themes).map((key) => (
              <option key={key} value={key}>
                {themes[key].name}
              </option>
            ))}
          </select>
        </header>

        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">

          <button
            className="rounded-md px-4 py-2 font-medium transition-all hover:brightness-120 active:brightness-90"
            style={{
              backgroundColor: `hsl(var(--primary))`,
              color: `hsl(var(--primary-foreground))`,
            }}
          >
            Primary Button
          </button>

          <button
            className="rounded-md px-4 py-2 font-medium border transition-all hover:brightness-120 active:brightness-90"
            style={{
              backgroundColor: `hsl(var(--secondary))`,
              color: `hsl(var(--secondary-foreground))`,
              borderColor: `hsl(var(--border))`,
            }}
          >
            Secondary
          </button>

          <button
            className="rounded-md px-4 py-2 font-medium transition-all hover:brightness-120 active:brightness-90"
            style={{
              backgroundColor: `hsl(var(--accent))`,
              color: `hsl(var(--accent-foreground))`,
            }}
          >
            Accent
          </button>
        </section>

        <section className="grid sm:grid-cols-2 gap-6 mt-10">
          <div
            className="rounded-lg p-6 border shadow-sm"
            style={{
              backgroundColor: `hsl(var(--card))`,
              color: `hsl(var(--card-foreground))`,
              borderColor: `hsl(var(--border))`,
            }}
          >
            <h2 className="text-xl font-semibold mb-2">Card Title</h2>
            <p className="text-sm opacity-80">
              This card adapts to the selected theme’s background and text
              colors. Borders and shadows adjust automatically too.
            </p>
          </div>

          <div
            className="rounded-lg p-6 border shadow-sm"
            style={{
              backgroundColor: `hsl(var(--muted))`,
              color: `hsl(var(--muted-foreground))`,
              borderColor: `hsl(var(--border))`,
            }}
          >
            <h2 className="text-xl font-semibold mb-2">Muted Section</h2>
            <p className="text-sm opacity-80">
              Useful for showing subtle differences in background or tone.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
