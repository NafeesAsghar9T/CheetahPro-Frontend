module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@App': './App',
        },
      },
      'react-native-reanimated/plugin',
    ],
    // 'react-native-reanimated/plugin',
  ],
};
