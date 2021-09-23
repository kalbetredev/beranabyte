const colors = require("tailwindcss/colors");

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
      colors: {
        brand: {
          light: "#459F9F",
          DEFAULT: "teal",
          dark: "#116666",
        },
        light: "white",
        dark: "#212121",
        gray: colors.trueGray,
      },
      dropShadow: {
        error: "0px 0px 15px #FF0000",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: theme("colors.gray.700"),
            },
            a: {
              color: "teal",
              "&:hover": {
                color: "#459F9F",
              },
            },
            img: {
              marginBottom: 0,
              margin: "0px auto",
              textAlign: "center",
              width: "100%",
              aspectRatio: "auto 700 / 467",
            },
            ".img-caption": {
              fontSize: "0.8em",
              display: "block",
              textAlign: "center",
              marginBottom: "3rem",
            },
            "h2, h3, h4, h5, h6": {
              marginTop: 0,
              paddingTop: "3.5rem",
              paddingBottom: "1rem",
              marginLeft: "-1rem",
              paddingLeft: "1rem",
              position: "relative",
            },
            "h2:hover > a, h3:hover > a, h4:hover > a, h5:hover > a, h6:hover > a":
              {
                display: "block",
              },
            ".header-anchor": {
              display: "none",
              textDecoration: "none",
              position: "absolute",
              paddingTop: "4rem",
              marginLeft: "-0.1rem",
              fontSize: "0.8rem",
              top: 0,
              left: 0,
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: "#459F9F",
              "&:hover": {
                color: "teal",
              },
            },
            h1: {
              color: theme("colors.gray.300"),
            },
            h2: {
              color: theme("colors.gray.300"),
            },
            h3: {
              color: theme("colors.gray.300"),
            },
            h4: {
              color: theme("colors.gray.300"),
            },
            h5: {
              color: theme("colors.gray.300"),
            },
            h6: {
              color: theme("colors.gray.300"),
            },
            strong: {
              color: theme("colors.gray.300"),
            },
            code: {
              color: theme("colors.gray.300"),
            },
            figcaption: {
              color: theme("colors.gray.500"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
