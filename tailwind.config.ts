import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'custom': '0px 0px 15px 10px rgba(30, 58, 138, 0.5)',
        'button': '0px 0px 15px 5px rgba(215, 224, 224, 0.5)',
      },
      animation: {
        'bubble-dynamic': 'bubble-dynamic 50s alternate infinite ease-in-out',
      },
      keyframes: {
        'bubble-dynamic': {
          '0%': { transform: 'scale(0.8) translateY(0) translateX(0)', opacity: '0.5' },
          '10%': { transform: 'scale(1.1) translateY(-10px) translateX(5px)', opacity: '0.6' },
          '20%': { transform: 'scale(0.9) translateY(-5px) translateX(-10px)', opacity: '0.7' },
          '30%': { transform: 'scale(1.2) translateY(-15px) translateX(10px)', opacity: '0.6' },
          '40%': { transform: 'scale(1) translateY(-10px) translateX(-5px)', opacity: '0.5' },
          '50%': { transform: 'scale(1.2) translateY(0) translateX(5px)', opacity: '0.7' },
          '60%': { transform: 'scale(0.9) translateY(10px) translateX(-10px)', opacity: '0.6' },
          '70%': { transform: 'scale(1.1) translateY(5px) translateX(0)', opacity: '0.5' },
          '80%': { transform: 'scale(1) translateY(0) translateX(-5px)', opacity: '0.6' },
          '90%': { transform: 'scale(1.2) translateY(-10px) translateX(10px)', opacity: '0.7' },
          '100%': { transform: 'scale(1) translateY(0) translateX(0)', opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
