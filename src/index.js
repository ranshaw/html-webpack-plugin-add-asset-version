// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
class AutoClearCache {

  constructor (options) {
    this.options = options || {};
  }
  
  apply (compiler) {
    
      if(HtmlWebpackPlugin.getHooks) {

        compiler.hooks.compilation.tap('AutoClearCache', (compilation) => {
          HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
            'AutoClearCache',  
            (data, cb) => {
               const { noCacheFilesName = [] } = this.options
                noCacheFilesName.forEach(item => {
                  data.html = data.html.replace(new RegExp(`${item}.*?`), `${item}?v=${Date.now()}`)
                })
            
              cb(null, data)
            }
          )
        })
       
      } else {
        console.error('HtmlWebpackPlugin.getHooks is not a function, please update HtmlWebpackPlugin to v4.0.0 or higher')
      }
   
  }
}

module.exports = AutoClearCache