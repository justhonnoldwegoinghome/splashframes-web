import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        tablet: "768px",
        laptop: "1200px",
        desktop: "1920px",
      },
      colors: {
        primary: "#1f2937",
        secondary: "#6b7280",
        sauce: "#3b82f6",
      },
    },
    plugins: [],
  },
};

export default config;
