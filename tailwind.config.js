module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  // purge: false, // purge in postcss.config.js
  purge: {
    // layers: ['utilities'],
    content: ['./components/**/*.{js,ts,tsx}', './pages/**/*.{js,ts,tsx}'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
