const colors = require("tailwindcss/colors");

const customColors = {
  bg: "#000000",
  fg: "#f8f9fa",
  article: "#dee2e6",
  accent: "#ff1769",
  accentDim: "#9a2d55",
  gray: "#8b9198",
  dim: "#67778a",
};

module.exports = {
  darkMode: "class", // 'media' or 'class'
  theme: {
    fontFamily: {
      sans: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    },
    colors: {
      ...colors,
      ...customColors,
    },
  },
  variants: {},
};
