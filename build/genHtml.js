var fs = require('fs');
var pug = require('pug');
var pretty = require('pretty')

function genHtml(options){
    var template = fs.createReadStream(options.template);
    var input = fs.createReadStream(options.input);
    var output = fs.createWriteStream(options.output);

    var json = '';
    var templateStr = '';
    var baseSrc = 'include /mixin.pug\n';

    template.on('data', function(data){
        templateStr = data.toString();

        input.on('data', function(data){
            json += data;
        });
        input.on('end', function(){
            json = JSON.parse(json.toString());
            json.forEach(function(item){
                if(item.meta.examples != null){
                    if(typeof item.meta.examples === 'string'){
                        item.meta.examples = [item.meta.examples];
                    }

                    item.meta.examples = item.meta.examples.map(function(example){
                        var exp = baseSrc + example;
                        return {
                            src: example,
                            dest: pretty(pug.compile(exp, {
                                basedir: './dist',
                                pretty: true,
                                compileDebug: true
                            })())
                        }
                    })
                }
            });
            var o = pug.compile(templateStr, {
                pretty: true,
                compileDebug: true
            })(Object.assign(options.data || {}, {
                data: json,
                count: json.length
            }));

            output.write(o);
        });
    });



}

module.exports = genHtml;



