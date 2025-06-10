module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@app': './app',
          '@assets': './app/assets',
          '@atoms': './app/components/atoms',
          '@components': './app/components',
          '@hooks': './app/hooks',
          '@locales': './app/locales',
          '@models': './app/models',
          '@molecules': './app/components/molecules',
          '@navigators': './app/navigators',
          '@organisms': './app/components/organisms',
          '@providers': './app/providers',
          '@screens': './app/screens',
          '@services': './app/services',
          '@stores': './app/stores',
          '@themes': './app/themes',
          '@utils': './app/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
    '@babel/plugin-transform-class-static-block',
  ],
}

