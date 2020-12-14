var test = require("ava");
var fs = require("fs");
var rimraf = require("rimraf");
var webpack = require("webpack");
var all_options = require("./all/webpack.config.js");
var css_options = require("./css/webpack.config.js");
var js_options = require("./js/webpack.config.js");
var custom_headers_options = require("./custom_headers/webpack.config.js");

// Fails on webpack errors and missing files
function webpackTest(test, errors, stats) {
  if (errors) {
    return test.end(errors);
  } else if (stats.hasErrors()) {
    return test.end(stats.toString());
  }

  // Test if files exist
  const files = stats.toJson().assets.map((x) => x.name);
  test.true(files.includes("index.html"));
  test.true(files.includes("main.css"));
  test.true(files.includes("bundle.js"));
  test.true(files.includes("_headers"));
}

test.cb("Both JS and CSS files in headers", (t) => {
  webpack(all_options, function (e, s) {
    webpackTest(t, e, s);

    const contents = fs.readFileSync("tests/all/dist/_headers", "utf8");
    const expected = fs.readFileSync("tests/all/_headers", "utf8");
    t.is(contents, expected);

    t.end();
  });
});

test.cb("Only CSS files in headers", (t) => {
  webpack(css_options, function (e, s) {
    webpackTest(t, e, s);

    const contents = fs.readFileSync("tests/css/dist/_headers", "utf8");
    const expected = fs.readFileSync("tests/css/_headers", "utf8");
    t.is(contents, expected);

    t.end();
  });
});

test.cb("Only JS files in headers", (t) => {
  webpack(js_options, function (e, s) {
    webpackTest(t, e, s);

    const contents = fs.readFileSync("tests/js/dist/_headers", "utf8");
    const expected = fs.readFileSync("tests/js/_headers", "utf8");
    t.is(contents, expected);

    t.end();
  });
});

test.cb("With custom headers in config", (t) => {
  webpack(custom_headers_options, function (e, s) {
    webpackTest(t, e, s);

    const contents = fs.readFileSync(
      "tests/custom_headers/dist/_headers",
      "utf8"
    );
    const expected = fs.readFileSync("tests/custom_headers/_headers", "utf8");
    t.is(contents, expected);

    t.end();
  });
});

// Remove dist folders after running tests
test.after.always("cleanup", (t) => {
  rimraf.sync("tests/all/dist");
  rimraf.sync("tests/css/dist");
  rimraf.sync("tests/js/dist");
  rimraf.sync("tests/custom_headers/dist");
});
