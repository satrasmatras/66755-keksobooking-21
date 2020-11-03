const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/random.js",
    "./js/backend.js",
    "./js/error.js",
    "./js/success.js",
    "./js/debounce.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/pins.js",
    "./js/filter.js",
    "./js/form.js",
    "./js/move.js",
    "./js/mainPin.js",
    "./js/map.js",
    "./js/page.js",
    "./js/main.js",
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
