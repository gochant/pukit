// 模板模型帮助方法
// 该代码用了 es5 es6... 所以最好不要在浏览器环境运行，否则转换

var helper = {
    getModelFields: function (model, fields) {
        if (fields == null) {
            fields = Object.keys(model.fields).filter(function (value) {
                return !model.fields[value].calculate
            })
        }
        if (typeof fields === 'string') {
            fields = model.views[fields]
        }
        return fields;
    },
    getModelKendoExpression: function (type, prop) {
        var text;
        var empty = '-';  // null placeholder
        switch (type) {
            case 'date':
                text = `${prop} != null ?  kendo.toString(kendo.parseDate(${prop}), 'yyyy/MM/dd'): '${empty}'`;
                break;
            case 'datetime':
                text = `${prop} != null ?  kendo.toString(kendo.parseDate(${prop}), 'yyyy/MM/dd HH:mm:ss'): '${empty}'`;
                break;
            case 'boolean':
                text = `${prop} ? '是': '否'`;
                break;
            case 'currency':
                text = `${prop} != null ?  kendo.toString(${prop}, 'n'): '${empty}'`;
                break;
            default:
                text = `${prop} != null ? ${prop} : '${empty}'`;
                break;
        }

        return text;
    }
};
module.exports = helper;