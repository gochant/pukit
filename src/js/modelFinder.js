var gulp = require('gulp');
var map = require('map-stream');
var path = require('path');
require("amd-loader");

module.exports = function (modelSrc, callback) {
    var modelProvider = {};
    gulp.src(modelSrc).on('end', function () {
        callback(modelProvider);
    }).pipe(map(function (file, cb) {
        var filePath = path.relative(__dirname, file.path);
        var obj = require(filePath)();
        Object.assign(modelProvider, obj);
    }));
};