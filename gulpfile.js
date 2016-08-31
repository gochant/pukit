var gulp = require('gulp');
var pugDoc = require('pug-doc');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var data = require('gulp-data');
var fm = require('front-matter');
var concat = require('gulp-concat');
var PugDocMarkdown = require('pug-doc-markdown');
var PugDocHTML = require('pug-doc-html');
var clean = require('gulp-clean');

var templateHelper = require('./src/js/templateHelper.js');
var modelFilePath = './demo/model.js';
var pugBaseUrl = './dist';
var srcFiles = './demo/**/*.html.pug';
var docDestJson = 'doc/doc.json';
var docDestMarkdown = 'doc/doc.md';
var docDestHtml = 'doc/output.html';

function getContextName(path) {
    var r = /.*[\/|\\]([\w|-]*)[\/|\\][^\/]*$/g.exec(path);
    if (r && r.length >= 2) {
        return r[1];
    }
    return null;
}

gulp.task('clean', function () {
    return gulp.src('./dist/', { read: false })
        .pipe(clean());
});

gulp.task('demo', ['release'], function () {
    var modelProvider = require(modelFilePath);

    gulp.src(srcFiles)
    .pipe(rename(function (path) {
        path.extname = '';
    }))
    .pipe(data(function (file) {
        var content = fm(String(file.contents));
        file.contents = new Buffer(content.body);
        var context = getContextName(file.path);
        var contextModel = modelProvider[content.attributes.context || context];
        var result = {
            globalModel: modelProvider,
            contextModel: contextModel,
            model: contextModel && contextModel[content.attributes.model],
            helper: templateHelper
        };
        return result;
    }))
    .pipe(pug({
        basedir: pugBaseUrl,
        client: false,
        pretty: true,
        compileDebug: false,
        debug: false,
        cache: false
    }))
    .pipe(gulp.dest('demo/'));

});

gulp.task('release', function () {
    return gulp.src(['src/**/*.pug', '!src/mixin.pug', '!src/layouts/*.pug'])
      .pipe(concat('mixin.pug'))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('doc', function (cb) {
    pugDoc({
        input: './src/**/*.pug',
        output: docDestJson,
        complete: function () {
            var stream = new PugDocHTML({
                output: docDestHtml,
                input: '../../' + docDestJson
            });

            stream.on('complete', function () {
                console.log('complete');
            });
            //var stream = new PugDocMarkdown({
            //    output: destMarkdown,
            //    input: '../../' + destJson
            //});

            //stream.on('complete', function () {
            //    console.log('complete');
            //});
        },
        globals: {
            myGlobal: 'foo'
        }
    });
});

gulp.task('default', ['release']);