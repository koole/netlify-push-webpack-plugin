const HtmlWebpackPlugin = require("html-webpack-plugin");

class NetlifyPushWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  buildHeaders({ js, css }, options = {}) {
    const { headers } = this.options || [];
    const { include } = this.options || 'all';

    const scripts = js.map(f => `  Link: <${f}>; rel=preload; as=script`);
    const styles = css.map(f => `  Link: <${f}>; rel=preload; as=style`);
    return include === 'all' ? ["/*", ...scripts, ...styles, ...headers].join("\n")
      : include === 'js' ? ["/*", ...scripts, ...headers].join("\n")
      : include === 'css' ? ["/*", ...styles, ...headers].join("\n");
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("NetlifyPushWebpackPlugin", compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        "NetlifyPushWebpackPlugin",
        (data, cb) => {
          const filedata = this.buildHeaders(data.assets, this.options);
          compilation.assets[`${this.options.filename}`] = {
            source: () => filedata,
            size: () => filedata.length
          };
          cb(null, data);
        }
      );
    });
  }
}

module.exports = NetlifyPushWebpackPlugin;
