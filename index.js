const path = require('node:path');
const ejs = require('ejs');
const terser = require('terser');
const htmlmin = require('html-minifier-terser');

/**
 * @typedef {Object} Options
 * @property {boolean} client
 * @property {boolean} compileDebug
 * @property {boolean} minimize
 * @property {boolean} beautify
 * @property {boolean} htmlmin
 * @property {import('html-minifier-terser').Options} htmlminOptions
 * @property {import('terser').MinifyOptions} terserOptions
 */

/**
 * @type {import('webpack').LoaderDefinitionFunction<Options>}
 * @this {import('webpack').LoaderContext<Options>}
 */
module.exports = function (source, sourceMaps, meta) {
    const callback = this.async();
    (async () => {
        this.cacheable();
        const options = this.getOptions();

        /** @type {Options} */
        const defaults = {
            client: true,
            compileDebug: this.mode === 'development',
            minimize: this.mode === 'production',
            beautify: false,
            htmlmin: this.mode === 'production',
            htmlminOptions: {},
            terserOptions: {},
        };

        const opts = { ...defaults, ...options };

        // minify html
        if (opts.htmlmin) {
            source = await htmlmin.minify(source, opts.htmlminOptions);
        }

        // compile template
        let template = ejs
            .compile(source, { ...opts, filename: path.relative(process.cwd(), this.resourcePath) })
            .toString();

        // minify js with terser
        if (opts.minimize) {
            template = terser.minify(template, opts.terserOptions).code + '';
        }

        callback(null, 'module.exports = ' + template, sourceMaps, meta);
    })().catch((err) => callback(err));
};
