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
      },
      backgroundImage: {
        gradient:
          "linear-gradient(125deg, hsl(192, 100%, 67%),hsl(280, 87%, 65%))",
        "header-bg": "var(--header-bg)",
      },
    },
  },
  plugins: [],
};
