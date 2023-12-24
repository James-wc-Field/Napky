import type { Config } from 'tailwindcss'

const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-light': '#baf7c8',
        'primary-dark': '#7ca397',
        'secondary': '#ffff66',
        'neutral-light': '#b6bab7',
        'neutral-dark': '#505251',
        'accent': '#daa5e6',
      },
      gridTemplateColumns: {
        sidebar: "300px auto", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
export default config
