const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = __dirname;
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const babelLoaderConfiguration = {
  test: /\.[jt]sx?$/,
  include: [
    resolveApp('index.web.js'),
    resolveApp('App.tsx'),
    resolveApp('src'),
    resolveApp('node_modules/react-native'),
    resolveApp('node_modules/@react-native'),
    resolveApp('node_modules/react-native-web'),
    resolveApp('node_modules/react-native-gesture-handler'),
    resolveApp('node_modules/@react-native-async-storage'),
    resolveApp('node_modules/phosphor-react-native'),
    resolveApp('node_modules/react-native-svg'),
    resolveApp('node_modules/react-native-paper'),
    resolveApp('node_modules/react-native-vector-icons')
  ],
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['module:@react-native/babel-preset'],
    },
  },
};

module.exports = (_, argv = {}) => {
  const isDevelopment = argv.mode !== 'production';

  return {
    entry: resolveApp('index.web.js'),
    output: {
      path: resolveApp('dist'),
      publicPath: '/',
      filename: 'bundle.js',
      clean: true,
    },
    resolve: {
      extensions: ['.web.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        'react-native$': 'react-native-web',
        '@react-native-async-storage/async-storage$': resolveApp('src/web/stubs/asyncStorage.ts'),
        'react-native-reanimated$': resolveApp('src/web/stubs/reactNativeReanimated.ts'),
        '@react-native-vector-icons/material-design-icons$': require.resolve(
          'react-native-vector-icons/MaterialCommunityIcons'
        ),
        '@expo/vector-icons/MaterialCommunityIcons$': require.resolve(
          'react-native-vector-icons/MaterialCommunityIcons'
        ),
      },
    },
    module: {
      rules: [
        babelLoaderConfiguration,
        {
          test: /\.(png|jpe?g|gif|webp|svg|ttf|otf)$/,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(isDevelopment),
      }),
      new HtmlWebpackPlugin({
        template: resolveApp('public/index.html'),
      }),
    ],
    devServer: {
      static: {
        directory: resolveApp('public'),
      },
      historyApiFallback: true,
      hot: true,
      port: 8080,
    },
  };
};
