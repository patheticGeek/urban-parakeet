import { type Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-poppins)", ...fontFamily.sans],
      },
      colors: {
        primary: {
          4: "#F1C12B",
        },
        black: "#121317",
        gray: "#404555",
        royalBlue: {
          4: "#2558E5",
        },
        charcoal: "#606880",
        divider: "#DCDEE5",
        danger: {
          4: "#D92D20",
        },
        lightBg: "#F7F7F7",
      },
    },
  },
  plugins: [forms()],
} satisfies Config;
1;
