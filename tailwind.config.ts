import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "float-rotate": "floatRotate 4s ease-in-out infinite alternate",
      },
      keyframes: {
        floatRotate: {
          "0%": {
            transform: "translateX(0px) translateY(0px) rotate(0deg)",
          },
          "70%": {
            transform: "translateX(0px) translateY(0px) rotate(0deg)",
          },
          "90%": {
            transform: "translateX(-10px) translateY(120px) rotate(10deg)",
          },
          "100%": {
            transform: "translateX(-10px) translateY(120px) rotate(3deg)",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
