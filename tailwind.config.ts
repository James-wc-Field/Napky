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
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        main: ["Cooper"]
      }
    },
  },
  plugins: [
    nextui(
      {
        prefix: "nextui",
        addCommonColors: true,
        defaultTheme: "light-test",
        defaultExtendTheme: "light",
        layout: {},
        themes: {
          "light-test": {
            layout: {},
            colors: {
              background: "#E4FBF0",
              foreground: "#1F1E41",
              divider: "#0B1912",
              overlay: "#E4FBF0",
              focus: "#357E5C",
              content1: "#E4FBF0",
              content2: "#5FCB99",
              content3: "#FFFFFF"
            }
          },
          "dark-test": {
            layout: {},
            colors: {
              background: "#0B1912",
              foreground: "#DEDDFE",
              divider: "#E4FBF0",
              overlay: "#0B1912",
              focus: "#357E5C",
              content1: "#0B1912",
              content2: "#1A3B2C",
              content3: "#000000"
            }
          } 
        }
      }
    )
  ],
}
