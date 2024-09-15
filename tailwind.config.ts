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
        "login-background-image":
          "url('https://dogs.origamid.dev/assets/login-800344e4.jpg')",
        "register-complete-auth-image":
          "url('https://images.unsplash.com/photo-1695937107602-d9ac53393ccf?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      },
      backgroundPosition: {
        "login-background-position": "center center",
      },
      fontFamily: {
        helvetica: "helvetica",
      },
      fontWeight: {
        "spectral-700": "700",
      },
      colors: {
        spectral: {
          dark: "rgb(51,51,51)",
        },
      },
      boxShadow: {
        "active-input": "0 0 0 3px #fea",
      },
      keyframes: {
        slideDownFromUp: {
          from: {
            opacity: "0",
            transform: "translate3d(0, -50px, 0)",
          },
          to: {
            opacity: "1",
            transform: "translate3d(0, 0px, 0)",
          },
        },
        slideUpFromDown: {
          from: {
            opacity: "0",
            transform: "translate3d(0, 50px, 0)",
          },
          to: {
            opacity: "1",
            transform: "translate3d(0, 0px, 0)",
          },
        },
        loadingEffect: {
          from: {
            opacity: "0.72",
            transform: "translate3d(0, -5px, 0)",
          },
          to: {
            opacity: "1",
            transform: "translate3d(0, 0px, 0)",
          },
        },
      },
      animation: {
        "transition-page-up": "slideDownFromUp .52s forwards",
        "transition-page-down": "slideUpFromDown .52s forwards",
        "loading-effect": "loadingEffect .62s alternate infinite"
      },
    },
  },
  plugins: [],
};
export default config;
