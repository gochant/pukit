
# pukit

一个 pug mixin 工具包，一种维护 HTML 的简单模式：

> 配置 + 模板 = HTML


**model.js**

```js
'use strict';

var models = {
    context1: {
        Person: {
            fields: {
                name: {
                    displayName: 'Name',
                    type: 'string'
                },
                birth: {
                    displayName: 'Birthday',
                    type: 'date'
                }
            }
        }
    }
}

module.exports = models;
```

**template.pug**

```pug
---
model: Person
---

+navbar
  +nav
    +nav-item #{model.fields.name.displayName}
    +nav-item #{model.fields.birth.displayName}

+editor-for-model(model)
```

**output.html**

```html
<ul class="nav" role="tablist">
    <li class="nav-item" role="presentation">
        <a class="nav-link" href="javascript:;">Name</a>
    </li>
    <li class="nav-item" role="presentation">
        <a class="nav-link" href="javascript:;">Birthday</a>
    </li>
</ul>

<div class="form-group row">
    <label class="control-label col-xs-3">Name</label>
    <div class="col-xs-9 form-control-container">
    <input class="form-control" type="text" data-bind="value: data.name" name="name"/>
    </div>
</div>
<div class="form-group row">
    <label class="control-label col-xs-3">Birthday</label>
    <div class="col-xs-9 form-control-container">
    <input class="form-control date" readonly="readonly" data-bind="date: data.birth" name="birth"/>
    </div>
</div>
```