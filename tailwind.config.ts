import type { Config } from 'tailwindcss'

const {nextui} = require("@nextui-org/react");
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    "light1": {
      extend: "light",
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
    "dark1": {
      extend: "dark",
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
  }, 
  darkMode: "class",
  plugins: [nextui()],
}
export default config
