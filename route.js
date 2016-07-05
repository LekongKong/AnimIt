//chenyutong@baixing.com
var path = require('path');
var fs = require('fs');

var publicPath = './dist';
var indexFile = 'index.html';

function tryFile(file, defaultFile) {
    if (fs.existsSync(file)) {
        return fs.readFileSync(file, {encoding: 'utf8'});
    }
    return fs.readFileSync(defaultFile, {encoding: 'utf8'});
}

module.exports = {
    'GET /**': function(req, res, next) {

        var file = path.join(publicPath, req.url);
        var defaultFile = path.join(publicPath, indexFile);
        res.send(tryFile(file, defaultFile));
    }
};