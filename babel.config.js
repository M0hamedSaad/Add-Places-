module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
        },
        extensions: ['.ios.tsx', '.android.tsx', '.tsx', '.ts', '.json'],
      },
    ],
  ],
};
