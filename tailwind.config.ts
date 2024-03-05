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
    nextui(
      // {
      //   prefix: "nextui",
      //   addCommonColors: false,
      //   defaultTheme: "dark-test",
      //   defaultExtendTheme: "dark",
      //   layout: {
      //     hoverOpacity: 0.8
      //   },
      //   themes: {
      //     "light-test": {
      //       layout: {},
      //       colors: {
      //         default: {
      //           900: "#0D1A14",
      //           800: "#0F2119",
      //           700: "#1A3B2C",
      //           600: "#24533D",
      //           500: "#357E5C",
      //           400: "#47A57A",
      //           300: "#5FCB99",
      //           200: "#A8EBCC",
      //           100: "#CDF5E2",
      //           50: "#E4FBF0",
      //           DEFAULT: "#A8EBCC",
      //           foreground: "#1F1E41",
      //         },
      //         primary: {
      //           50: "#0D1A14",
      //           100: "#0F2119",
      //           200: "#1A3B2C",
      //           300: "#24533D",
      //           400: "#357E5C",
      //           500: "#47A57A",
      //           600: "#5FCB99",
      //           700: "#A8EBCC",
      //           800: "#CDF5E2",
      //           900: "#E4FBF0",
      //           DEFAULT: "#A8EBCC",
      //           foreground: "#1F1E41",
      //         }, 
      //         secondary: {
      //           50: "#0D0D1C",
      //           100: "#1F1E41",
      //           200: "#2D2C63",
      //           300: "#3B397B",
      //           400: "#49469E",
      //           500: "#635FCB",
      //           600: "#8582D6",
      //           700: "#AFADE4",
      //           800: "#CBCAEE",
      //           900: "#E2E1F5",
      //           DEFAULT: "#635FCB",
      //           foreground: "#0F2119",
      //         }, 
      //         background: "#E4FBF0",
      //         foreground: "#1F1E41",
      //         divider: "#0B1912",
      //         overlay: "#E4FBF0",
      //         focus: "#357E5C",
      //         content1: "#E4FBF0",
      //         content2: "#5FCB99",
      //         content3: "#FFFFFF"
      //       }
      //     },
      //     "dark-test": {
      //       layout: {},
      //       colors: {
      //         default: {
      //           50: "#0D1A14",
      //           100: "#0F2119",
      //           200: "#1A3B2C",
      //           300: "#24533D",
      //           400: "#357E5C",
      //           500: "#47A57A",
      //           600: "#5FCB99",
      //           700: "#A8EBCC",
      //           800: "#CDF5E2",
      //           900: "#E4FBF0",
      //           DEFAULT: "#A8EBCC",
      //           foreground: "#1F1E41",
      //         },
      //         primary: {
      //           900: "#0D1A14",
      //           800: "#0F2119",
      //           700: "#1A3B2C",
      //           600: "#24533D",
      //           500: "#357E5C",
      //           400: "#47A57A",
      //           300: "#5FCB99",
      //           200: "#A8EBCC",
      //           100: "#CDF5E2",
      //           50: "#E4FBF0",
      //           DEFAULT: "#0F2119",
      //           foreground: "#DEDDFE",
      //         }, 
      //         secondary: {
      //           900: "#0D0D1C",
      //           800: "#1F1E41",
      //           700: "#2D2C63",
      //           600: "#3B397B",
      //           500: "#49469E",
      //           400: "#635FCB",
      //           300: "#8582D6",
      //           200: "#AFADE4",
      //           100: "#CBCAEE",
      //           50: "#E2E1F5",
      //           DEFAULT: "#635FCB",
      //           foreground: "#FFFFFF",
      //         },
      //         background: "#0B1912",
      //         foreground: "#DEDDFE",
      //         divider: "#E4FBF0",
      //         overlay: "#0B1912",
      //         focus: "#357E5C",
      //         content1: "#0B1912",
      //         content2: "#1A3B2C",
      //         content3: "#000000"
      //       }
      //     } 
      //   }
      // }
    )
  ],
}
