'use strict';

// Documentation for Brunch plugins:
// http://brunch.io/docs/plugins
const Purgecss = require('purgecss')

// Remove everything your plugin doesn't need.
class PurgecssPlugin {
  constructor(config) {
    this.config = config.plugins.purgecss || {};
  }

  // Optional
  // Specifies additional files which will be included into build.
  // get include() { return ['path-to-file-1', 'path-to-file-2']; }

  // file: File => Promise[Boolean]
  // Called before every compilation. Stops it when the error is returned.
  // Examples: ESLint, JSHint, CSSCheck.
  // lint(file) { return Promise.resolve(true); }

  // file: File => Promise[File]
  // Transforms a file data to different data. Could change the source map etc.
  // Examples: JSX, CoffeeScript, Handlebars, SASS.
  // compile(file) { return Promise.resolve(file); }

  // file: File => Promise[Array: Path]
  // Allows Brunch to calculate dependants of the file and re-compile them too.
  // Examples: SASS '@import's, Jade 'include'-s.
  // getDependencies(file) { return Promise.resolve(['dep.js']); }

  // file: File => Promise[File]
  // Usually called to minify or optimize the end-result.
  // Examples: UglifyJS, CSSMin.
  // optimize(file) { return Promise.resolve({data: minify(file.data)}); }
  optimize(file) {
    let purger = new Purgecss({
      content: this.config.paths,
      extractors: this.config.extractors,
      css: [file.data],
      stdin: true
    });

    let purgeResult = purger.purge();
    return Promise.resolve({data: purgeResult[0].css});
  }
}

// Required for all Brunch plugins.
PurgecssPlugin.prototype.brunchPlugin = true;

// Required for compilers, linters & optimizers.
// 'javascript', 'stylesheet' or 'template'
// PurgecssPlugin.prototype.type = 'javascript';
PurgecssPlugin.prototype.type = 'stylesheet';

// Required for compilers & linters.
// It would filter-out the list of files to operate on.
// PurgecssPlugin.prototype.extension = 'js';
// PurgecssPlugin.prototype.extension = 'css';
PurgecssPlugin.prototype.pattern = /\.css$/;

// Indicates which environment a plugin should be applied to.
// The default value is '*' for usual plugins and
// 'production' for optimizers.
// PurgecssPlugin.prototype.defaultEnv = 'production';

module.exports = PurgecssPlugin;
