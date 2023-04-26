## Installation


```javascript
      npm i --save-dev html-webpack-plugin-add-asset-version
``` 

```javascript
      yarn add --dev html-webpack-plugin-add-asset-version
``` 


## Basic Usage

the plugin will add a version number to the specified file , In order to prevent bugs caused by caching problems.

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetVersion = require('html-webpack-plugin-add-asset-version');
const webpackConfig = {
  entry: 'index.js',
  output: {
    path: 'dist',
    filename: 'index_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new AddAssetVersion({ noCacheFilesName: ['test.js','test.css'] }),
  ],
};
```