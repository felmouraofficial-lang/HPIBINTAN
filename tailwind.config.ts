import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "#d71920", foreground: "#ffffff" },
        gold: { DEFAULT: "#f6c343", deep: "#c99213" },
      },
      boxShadow: { soft: "0 18px 50px rgba(31, 41, 55, .10)" },
      borderRadius: { xl: "0.75rem" },
    },
  },
  plugins: [],
};
export default config;
