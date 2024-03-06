/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/react");
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ], 
  darkMode: "media",
  theme: {
    extend: {
    colors: {
      background: {
        light: "#E4FBF0",
        DEFAULT: "#E4FBF0",
        dark: "#0B1912"
      },
      foreground: {
        light: "#1F1E41",
        DEFAULT: "#1F1E41",
        dark: "#DEDDFE"
      },
      divider: {
        light: "#0B1912",
        DEFAULT: "#0B1912",
        dark: "#E4FBF0"
      },
      overlay: {
        light: "#E4FBF0",
        DEFAULT: "#E4FBF0",
        dark: "#E4FBF0"
      },
      focus: {
        light: "#357E5C",
        DEFAULT: "#357E5C",
        dark: "#357E5C"
      },
      content1: {
        light: "#E4FBF0",
        DEFAULT: "#E4FBF0",
        dark: "#0B1912"
      },
      content2: {
        light: "#5FCB99",
        DEFAULT: "#5FCB99",
        dark: "#1A3B2C"
      },
      content3: {
        light: "#FFFFFF",
        DEFAULT: "#FFFFFF",
        dark: "#000000"
      }
    },
      fontFamily: {
        main: ["Cooper"]
      }
    },
  },
  plugins: [
    nextui()
  ],
}
