module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/icons/**/*.{js,ts,jsx,tsx}",
    "./src/common/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        brand: "teal",
        light: "white",
        dark: "#212121",
      },
      textColor: {
        brand: "teal",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
