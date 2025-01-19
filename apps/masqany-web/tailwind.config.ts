import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}", "./root.tsx"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;