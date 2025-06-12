import { fileURLToPath } from 'url';
import { dirname, resolve as _resolve } from 'path';
import ESLintPlugin from 'eslint-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';

export const mode = isProduction ? 'production' : 'development';
export const entry = './src/index.ts';
export const output = {
  path: _resolve(__dirname, 'dist'),
  filename: 'index.js',
  libraryTarget: 'umd',
  library: 'MyReactLibrary',
  umdNamedDefine: true,
  clean: true,
  globalObject: 'this',
};

export const plugins = [
  new ESLintPlugin({}),
  new MiniCssExtractPlugin({
    filename: 'styles.css',
  }),
];

export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.css$/i,
      use: [
        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
              localIdentName: isProduction
                ? '[hash:base64:8]'
                : '[name]__[local]--[hash:base64:5]',
            },
            importLoaders: 1,
          },
        },
      ],
    },
  ],
};

export const resolve = {
  extensions: ['.tsx', '.ts', '.js', '.jsx'],
  alias: {
    '@': _resolve(__dirname, 'src'),
  },
};

export const externals = {
  react: {
    commonjs: 'react',
    commonjs2: 'react',
    amd: 'react',
    root: 'React',
  },
  'react-dom': {
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    amd: 'react-dom',
    root: 'ReactDOM',
  },
};

export const optimization = {
  minimize: isProduction,
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
        },
        format: {
          comments: false,
        },
      },
      extractComments: false,
    }),
  ],
  usedExports: true,
  sideEffects: true,
};

export const devtool = isProduction ? 'source-map' : 'eval-source-map';
