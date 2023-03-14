const { DefaultRouteMatcherManager } = require('next/dist/server/future/route-matcher-managers/default-route-matcher-manager');

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens
    },
    extend: {
      keyframes: {
        fadeIn: {
          'from': { opacity: '0'},
          'to': { opacity: '1'}
        },
        fadeOut: {
          'from': { opacity: '1'},
          'to': { opacity: '0' } 
        },
        growSm: {
          'from': { transform: 'scale(0.96)' },
          'to': { transform: 'scale(1)'}
        },
        shrinkSm: {
          'from': { transform: 'scale(1)'},
          'to': { transform: 'scale(0.96)'}
        },
        topDown: {
          'from': { transform: 'translateY(-1rem)'},
          'to': { transform: 'translateY(0)'}
        },
        downTop: {
          'from': { transform: 'translate(-50%, -50%)'},
          'to': { transform: 'translate(-50%, -48%)'}
        }
      },
      animation: {
        'contentShow': 'fadeIn 0.2s ease-in, growSm 0.2s ease-in, topDown 0.2s ease-in',
        'overlayShow': 'fadeIn 0.2s ease-in'
      }
    },
  },
  plugins: [],
}
