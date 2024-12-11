const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    blockList: /.*\\node_modules\\expo\\node_modules\\metro-runtime\\src\\modules\\empty-module.js/,
  },
};
