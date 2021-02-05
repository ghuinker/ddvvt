const purge = require('./purge.config.js')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: false,
  purge: {
    content: purge.content,
    options: {
      safelist: purge.safelist
    }
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
}