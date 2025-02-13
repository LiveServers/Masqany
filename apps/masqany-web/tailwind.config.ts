import {globalBrandColors} from "@masqany/theme"
import type { Config } from "tailwindcss";






export default {
  content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}', './root.tsx'],
  theme: {
    fontFamily: {},
    colors: globalBrandColors,
    extend: {},
  },
  plugins: [],
  extend: {
    backgroundImage: {
      logo: 'url(/images/masqany/logo.svg)',
    },
  },
} satisfies Config;
