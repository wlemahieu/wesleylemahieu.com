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
      'base1': '#3089e6',
      'base2': '#7b91bc',
      'base3': '#f3f9ff',
      'base4': '#eee8a9',
      'base5': '#21E7A6' // + green from paletton
    },
  },
  plugins: [],
}
