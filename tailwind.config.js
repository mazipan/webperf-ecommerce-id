module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: false, // purge in postcss.config.js
  // purge: {
  //   layers: ['utilities'],
  //   content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  // },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
