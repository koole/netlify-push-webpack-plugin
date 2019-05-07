# NetlifyPushWebpackPlugin
Generate HTTP2 Server Push `_headers` file for Netlify using HtmlWebpackPlugin.

For use with Webpack 4 and HtmlWebpackPlugin 4.0.0-alpha.2

## Installation

```
npm i netlify-push-webpack-plugin
```

or 


```
yarn add netlify-push-webpack-plugin
```


## Usage

Option | Type | Description
--- | --- | ---
`filename` | String | Name and path of the generated headers file
`headers` | Array | Other headers to be added to the file
`include` | String | Only include 'css', 'js' or 'all' (default: 'all')

## Example

```js
module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new NetlifyServerPushPlugin({
      filename: "_headers",
      headers: [
        "  X-Frame-Options: DENY",
        "  Referrer-Policy: strict-origin-when-cross-origin",
        "/assets/*",
        "  Cache-Control: public, max-age:360000"
      ],
      filter: [/\.(js|css)$/]
    })
  ]
};
```
