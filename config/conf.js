'use strict';

const path    = require('path');
const rootDir = path.resolve(__dirname, '..');

module.exports = {
    dir: {
        root    : rootDir,
        build   : path.join(rootDir, 'dist'),
        fromRoot: function (args) {
            return path.join.apply(path, [rootDir].concat(args))
        }
    }
};
