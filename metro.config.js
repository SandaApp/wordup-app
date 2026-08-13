// Learn more: https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Keep design backups and concept art out of the JS bundle.
config.resolver.blockList = [
  /assets\/_originals_hires\/.*/,
  /assets\/concepts\/.*/,
  /release\/data-backups\/.*/,
  /.*\.flat\.backup\.json$/
];

module.exports = config;
