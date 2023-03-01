/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // using 'Discreet Palette' from (https://mycolor.space/?hex=%233089E6&sub=1)
    colors: {
      base1: "#3089e6", //blue
      base2: "#7b91bc", // purple-blue
      base3: "#f3f9ff", // sky-blue
      base4: "#eee8a9", // black
      base5: "#21E7A6", // + light green from paletton (not in palette)
      base6: "#FFA825", // + orange, from tetrade blue-match
    },
  },
  plugins: [],
};
