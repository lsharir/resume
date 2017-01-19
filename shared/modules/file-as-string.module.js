var fs = require('fs');

function readModuleFile(path) {
    try {
        var filename = require.resolve(path);
        return fs.readFileSync(filename, 'utf8');
    } catch (e) {
        return e;
    }
}

module.exports = function (path) {
    return readModuleFile(path);
}