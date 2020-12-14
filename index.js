const HtmlWebpackPlugin = require("html-webpack-plugin");

class NetlifyPushWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  buildHeaders({ js, css }) {
    const headers = this.options.headers || [];
    const include = this.options.include || "all";

    const scripts = js.map((f) => `  Link: <${f}>; rel=preload; as=script`);
    const styles = css.map((f) => `  Link: <${f}>; rel=preload; as=style`);

    if (include === "all")
      return ["/*", ...scripts, ...styles, ...headers].join("\n");
    if (include === "js")
      return ["/*", ...scripts, ...headers].join("\n");
    if (include === "css")
      return ["/*", ...styles, ...headers].join("\n");
    return "";
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(
      "NetlifyPushWebpackPlugin",
      (compilation) => {
        HtmlWebpackPlugin.getHooks(
          compilation
        ).beforeAssetTagGeneration.tapAsync(
          "NetlifyPushWebpackPlugin",
          (data, cb) => {
            const filedata = this.buildHeaders(data.assets, this.options);
            compilation.assets[`${this.options.filename}`] = {
              source: () => filedata,
              size: () => filedata.length,
            };
            cb(null, data);
          }
        );
      }
    );
  }
}

module.exports = NetlifyPushWebpackPlugin;
