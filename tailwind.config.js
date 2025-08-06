/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slds-success': '#acf3e4',
        'slds-success-text': '#056764',
        'slds-warning': '#f9e3b6',
        'slds-warning-text': '#8c4b02',
      }
    },
  },
  plugins: [],
}