const colors = require("tailwindcss/colors");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        // "w-0": "0px ",
        // "w-px": "1px",
        // "w-0.5": "0.125rem",
        // " w-1": "0.25rem",
        // "w-1.5": " 0.375rem",
        // "w-2": "0.5rem",
        // "w-2.5": "0.625rem",
        // "w-3": "0.75rem",
        // "w-3.5": "0.875rem",
        // "w-4": "1rem",
        // "w-5": "1.25rem",
        // "w-6": "1.5rem",
        // "w-7": "1.75rem",
        // "w-8": "2rem",
        // "w-9": "2.25rem",
        // "w-10": "2.5rem",
        // "w-11": "2.75rem",
        // "w-12": "3rem",
        // "w-14": "3.5rem",
        // "w-16": "4rem",
        // "w-20": "5rem",
        // "w-24": "6rem",
        // "w-28": "7rem",
        // "w-32": "8rem",
        // "w-36": "9rem",
        // "w-40": "10rem",
        // "w-44": "11rem",
        // "w-48": "12rem",
        // "w-52": "13rem",
        // "w-56": "14rem",
        // "w-60": "15rem",
        // "w-64": "16rem",
        // "w-72": "18rem",
        // "w-80": "20rem",
        // "w-96": "24rem",
        // "w-auto": "auto",
        // "w-1/2": "50%",
        // "w-1/3": "33.333333%",
        // "w-2/3": "66.666667%",
        // "w-1/4": "25%",
        // "w-2/4": "50%",
        // "w-3/4": "75%",
        // "w-1/5": "20%",
        // "w-2/5": "40%",
        // "w-3/5": "60%",
        // "w-4/5": "80%",
        // "w-1/6": "16.666667%",
        // "w-2/6": "33.333333%",
        // "w-3/6": "50%",
        // "w-4/6": "66.666667%",
        // "w-5/6": "83.333333%",
        // "w-1/12": "8.333333%",
        // "w-2/12": "16.666667%",
        // "w-3/12": "25%",
        // "w-4/12": "33.333333%",
        // "w-5/12": "41.666667%",
        // "w-6/12": "50%",
        // "w-7/12": "58.333333%",
        // "w-8/12": "66.666667%",
        // "w-9/12": "75%",
        // "w-10/12": "83.333333%",
        // "w-11/12": "91.666667%",
        // "w-full": "100%",
        // "w-screen": "100vw",
        // "w-min": "min-content",
        // "w-max": "max-content",
        "13/14": "48%",
        "6/7": "85.7142857%",
      },
      height: {
        92: "22rem",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      "2xlm": { min: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xlm: { min: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lgm: { min: "1023px" },
      // => @media (max-width: 1023px) { ... }

      mdm: { min: "767px" },
      // => @media (max-width: 767px) { ... }

      smm: { min: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    colors: {
      teal: {
        100: "#E6FFFA",
        200: "#B2F5EA",
        300: "#81E6D9",
        400: "#4FD1C5",
        450: "#0EBAC5",
        500: "#38B2AC",
        600: "#319795",
        700: "#2C7A7B",
        800: "#285E61",
        900: "#234E52",
      },
      red: {
        100: "#FFF5F5",
        200: "#FED7D7",
        300: "#FEB2B2",
        400: "#FC8181",
        500: "#F56565",
        600: "#E53E3E",
        700: "#C53030",
        800: "#9B2C2C",
        900: "#742A2A",
      },
      gray: {
        0: "#fff",
        50: "#F9FAFB",
        100: "#F7FAFC",
        200: "#EDF2F7",
        250: "#F2F2F2",
        300: "#E2E8F0",
        350: "#eaeaea",
        400: "#CBD5E0",
        500: "#A0AEC0",
        600: "#718096",
        700: "#4A5568",
        800: "#2D3748",
        900: "#1A202C",
      },
      orange: {
        100: "#FFFAF0",
        200: "#FEEBC8",
        300: "#FBD38D",
        400: "#F6AD55",
        500: "#ED8936",
        600: "#DD6B20",
        700: "#C05621",
        800: "#9C4221",
        900: "#7B341E",
      },
      yellow: {
        100: "#FFFFF0",
        200: "#FEFCBF",
        300: "#FAF089",
        400: "#F6E05E",
        500: "#ECC94B",
        600: "#D69E2E",
        700: "#B7791F",
        800: "#975A16",
        900: "#744210",
      },
      green: {
        100: "#F0FFF4",
        200: "#C6F6D5",
        300: "#9AE6B4",
        400: "#68D391",
        500: "#48BB78",
        600: "#38A169",
        700: "#2F855A",
        800: "#276749",
        900: "#22543D",
      },
      blue: {
        100: "#EBF8FF",
        200: "#BEE3F8",
        300: "#90CDF4",
        400: "#63B3ED",
        500: "#4299E1",
        600: "#3182CE",
        700: "#2B6CB0",
        800: "#2C5282",
        900: "#2A4365",
      },
      purple: {
        100: "#FAF5FF",
        200: "#E9D8FD",
        300: "#D6BCFA",
        400: "#B794F4",
        500: "#9F7AEA",
        600: "#805AD5",
        700: "#6B46C1",
        800: "#553C9A",
        900: "#44337A",
      },
      indigo: {
        100: "#EBF4FF",
        200: "#C3DAFE",
        300: "#A3BFFA",
        400: "#7F9CF5",
        500: "#667EEA",
        600: "#5A67D8",
        700: "#4C51BF",
        800: "#434190",
        900: "#3C366B",
      },
      pink: {
        100: "#FFF5F7",
        200: "#FED7E2",
        300: "#FBB6CE",
        400: "#F687B3",
        500: "#ED64A6",
        600: "#D53F8C",
        700: "#B83280",
        800: "#97266D",
        900: "#702459",
      },
    },
    fontFamily: {
      mono: ["Times New Roman", "Times", "serif"],
      dm: ["DM Sans", "sans-serif"], // Ensure fonts with spaces have " " surrounding it.
      lato: ["Lato", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
