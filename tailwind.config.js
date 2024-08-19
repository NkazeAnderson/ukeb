/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      colors: {
      primary: "#2a76c6",
      secondary: "#c04317",
      info: "#ffc107",
      danger: "#bf161d",
      success: "#12bc15",
      white: "#ffffff",
      black: "#000000",
      gray: "#292b3d",
      "gray-text": "#cbccd1",
      background: "#161b2f",
      blue: "#001276",
    },
    fontSize: {
      "14": "14px",
      "16": "16px",
      "18": "18px",
      "20": "20px",
      "24": "24px",
      "24": "24px",
      "32": "32px",
      "48": "48px",
    },
    fontFamily: {
      light:"light",
      regular:"regular", bold:"bold", italics:"italics",
      medium:"medium"
    },
  
    extend: {},
  },
  plugins: [],
};
