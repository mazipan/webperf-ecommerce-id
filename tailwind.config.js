module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    // layers: ['utilities'],
    content: ['./components/**/*.js', './pages/**/*.js'],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
