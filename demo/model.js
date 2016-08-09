'use strict';

var models = {
    module1: {
        person: {
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