/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",
        "body-bg": "var(--body-bg)",
        "main-bg": "var(--main-bg)",
        text: "var(--text)",
        "border-bg": "var(--border-bg)",
        complements: "var(--complements)",
        "hover-bg": "var(--hover-bg)",
        dragging: "var(--dragging)",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(125deg, hsl(192, 100%, 67%),hsl(280, 87%, 65%))",
        "mobile-bg": "var(--mobile-bg)",
        "desktop-bg": "var(--desktop-bg)",
      },
    },
  },
  plugins: [],
};
