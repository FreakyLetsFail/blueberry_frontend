const { heroui } = require("@heroui/react");

module.exports = heroui({
  themes: {
    "dark-white": {
      extend: "dark", // inherit from dark theme
      colors: {
        background: "#000000",
        foreground: "#ffffff",
        primary: {
          50: "#e6f1fe",
          100: "#cce3fd",
          200: "#99c7fb",
          300: "#66aaf9",
          400: "#338ef7",
          500: "#006FEE",
          600: "#005bc4",
          700: "#004493",
          800: "#002e62",
          900: "#001731",
          DEFAULT: "#006FEE",
          foreground: "#ffffff",
        },
        focus: "#F182F6",
      },
      layout: {
        disabledOpacity: "0.3",
        radius: {
          small: "4px",
          medium: "6px",
          large: "8px",
        },
        borderWidth: {
          small: "1px",
          medium: "2px",
          large: "3px",
        },
      },
    },
  },
});
