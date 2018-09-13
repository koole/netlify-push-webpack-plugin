const HtmlWebpackPlugin = require("html-webpack-plugin");

class NetlifyPushWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  buildHeaders({ js, css }, headers = []) {
    const scripts = js.map(f => `  Link: <${f}>; rel=preload; as=script`);
    const styles = css.map(f => `  Link: <${f}>; rel=preload; as=stylesheet`);
    return ["/*", ...scripts, ...styles, ...headers].join("\n");
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("NetlifyPushWebpackPlugin", compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        "NetlifyPushWebpackPlugin",
        (data, cb) => {
          const filedata = this.buildHeaders(data.assets, this.options.headers);
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
