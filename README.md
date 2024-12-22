# ejs-compiled-loader for webpack

EJS loader for [webpack](https://webpack.js.org/). Uses [ejs](https://github.com/mde/ejs) function to compile templates.

This is the fork of the now abandoned [bazilio91/ejs-compiled-loader](https://github.com/bazilio91/ejs-compiled-loader) with updated dependencies, fixed vulnerabilities, and updated code base.

The main differences are:
* uses `ejs@3.x` instead of 2.x because `ejs` up to 3.1.9 has multiple vulnerabilities ([CVE-2022-29078](https://github.com/advisories/GHSA-phwq-j96m-2c2q), [CVE-2024-33883](https://github.com/advisories/GHSA-ghr5-ch3p-vcr6));
* uses `html-minifier-terser` instead of the abandoned `html-minifier` (which is affected by a [ReDoS vulnerability](https://github.com/advisories/GHSA-pfq8-rq6v-vf5m)). Some options of `html-minifier-terser` differs from those of `html-minifier`;
* does not suppoprt Webpack 4.x.

## Installation

```sh
npm install -D @myrotvorets/ejs-compiled-loader
```

## Usage

[Documentation: Using loaders](https://webpack.js.org/concepts/loaders/#using-loaders)

``` javascript
const template = require("ejs-compiled-loader!./file.ejs");
// => returns the template function compiled with ejs templating engine.

// And then use it somewhere in your code
template(data) // Pass object with data
```

## Options

The following options are supported:
* `beautify`: enable or disable terser beautify of the template AST;
* `compileDebug`: see the EJS [`compileDebug` option](https://ejs.co/#docs);
* `htmlmin`: whether to enable HTML minification;
* `htmlminOptions`: [options passed to `html-minifier-terser`](http://perfectionkills.com/experimenting-with-html-minifier/#options);
* `minimize`: whether to minimize the resulting JS code with [Terser](https://terser.org/);
* `terserOptions`: [options passed to `terser`](https://terser.org/docs/options/);
* [options supported by EJS](https://ejs.co/#docs).

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
