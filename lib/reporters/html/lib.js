'use strict';

var _ = require('lodash'),
    path = require('path'),

    REPORT_OUT_DIR = 'public/gemini-report',

    referencePath = _.partial(createPath, 'ref'),
    currentPath = _.partial(createPath, 'current'),
    diffPath = _.partial(createPath, 'diff'),

    absolutePath = _.partial(path.resolve, REPORT_OUT_DIR);

/**
 * @param {String} kind - одно из значение 'ref', 'current', 'diff'
 * @param {StateResult} result
 * @returns {String}
 */
function createPath(kind, result) {
    var retrySuffix = _.isUndefined(result.attempt) ? '' : `_${result.attempt}`;

    var components = [].concat('images', result.suite.path, result.state.name, result.browserId + '~' + kind + retrySuffix + '.png');
    const pathToImage = path.join.apply(null, components);

    return pathToImage;
}

module.exports = {
    REPORT_DIR: REPORT_OUT_DIR,

    referencePath: referencePath,
    currentPath: currentPath,
    diffPath: diffPath,

    referenceAbsolutePath: _.flowRight(absolutePath, referencePath),
    currentAbsolutePath: _.flowRight(absolutePath, currentPath),
    diffAbsolutePath: _.flowRight(absolutePath, diffPath)
};
