const {
  DefaultRouteMatcherManager,
} = require('next/dist/server/future/route-matcher-managers/default-route-matcher-manager');

/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '320px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        base: {
          darkMd: '#212939',
          md: '#84878B',
          semiMd: '#A9ADB5',
          light: '#D9D8DE',
          spLight: '#F0F2F5',
          DEFAULT: '#101622',
        },
        errorRed: {
          DEFAULT: '#E8361E',
        },
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        growSm: {
          from: { transform: 'scale(0.96)' },
          to: { transform: 'scale(1)' },
        },
        shrinkSm: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(0.96)' },
        },
        topDown: {
          from: { transform: 'translateY(-1rem)' },
          to: { transform: 'translateY(0)' },
        },
        downTop: {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-1rem)' },
        },
        aboutHeight: {
          from: { maxHeight: '0' },
          to: { maxHeight: '64rem' },
        },
      },
      animation: {
        contentShow:
          'fadeIn 0.15s ease-in, growSm 0.15s ease-in, topDown 0.15s ease-in',
        contentHide:
          'fadeOut 0.15s ease-in, shrinkSm 0.15s ease-in, downTop 0.15s ease-in',
        overlayShow: 'fadeIn 0.12s ease-in',
        overlayHide: 'fadeOut 0.12s ease-in',
        aboutShow: 'aboutHeight 0.12s ease-in',
      },
    },
  },
  plugins: [],
};
