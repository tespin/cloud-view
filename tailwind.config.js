const { DefaultRouteMatcherManager } = require('next/dist/server/future/route-matcher-managers/default-route-matcher-manager');

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens
    },
    extend: {},
  },
  plugins: [],
}
