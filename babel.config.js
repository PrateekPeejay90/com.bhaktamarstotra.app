module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Remove the old reanimated plugin since it's causing warnings
      // 'react-native-reanimated/plugin', // This is the old plugin causing issues
    ],
  };
};
