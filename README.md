# NetlifyPushWebpackPlugin
Generate HTTP2 Server Push `_headers` file for Netlify using HtmlWebpackPlugin.

## Usage

Option | Type | Description
--- | --- | ---
`filename` | String | Name and path of the generated headers file
`headers` | Array | Other headers to be added to the file

## Example

```js
module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new NetlifyServerPushPlugin({
      headersFile: "_headers",
      headers: [
        "  X-Frame-Options: DENY",
        "  Referrer-Policy: strict-origin-when-cross-origin",
        "/assets/*",
        "  Cache-Control: public, max-age:360000"
      ]
    })
  ]
};
```
