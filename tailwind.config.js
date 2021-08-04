module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./icons/**/*.{js,ts,jsx,tsx}",
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
