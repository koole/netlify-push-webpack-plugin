# NetlifyPushWebpackPlugin

[![CircleCI](https://circleci.com/gh/koole/netlify-push-webpack-plugin.svg?style=svg)](https://circleci.com/gh/koole/netlify-push-webpack-plugin)

Generate HTTP2 Server Push `_headers` file for Netlify using HtmlWebpackPlugin.

For use with Webpack 4 and HtmlWebpackPlugin 4.0.0-beta.5

## Installation

```
npm i netlify-push-webpack-plugin
```

or

```
yarn add netlify-push-webpack-plugin
```

## Usage

| Option     | Type   | Description                                        |
| ---------- | ------ | -------------------------------------------------- |
| `filename` | String | Name and path of the generated headers file        |
| `headers`  | Array  | Other headers to be added to the file (optional)   |
| `include`  | String | Only include 'css', 'js' or 'all' (default: 'all') |

## Example

The following config

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const NetlifyServerPushPlugin = require("netlify-push-webpack-plugin");

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
      include: "css"
    })
  ]
};
```

will result in a headers file looking something like this:

```
/*
  Link: <bundle.js>; rel=preload; as=script
  Link: <main.css>; rel=preload; as=style
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
/assets/*
  Cache-Control: public, max-age:360000
```

## Testing

Tests are ran using using Ava with the following command:

```
yarn run test
```
