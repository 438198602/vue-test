module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ["Android >= 4.4", "iOS >= 8"],
    },
    "postcss-px-to-viewport": {
      viewportWidth: 375,
    },
  },
};
