'use strict';

var models = {
    module1: {
        person: {
            fields: {
                name: {
                    displayName: 'Name',
                    type: 'string',
                    sortable: true
                },
                birth: {
                    displayName: 'Birthday',
                    type: 'date'
                },
                gender: {
                    displayName: 'Gender',
                    type: 'string'
                },
                isActive: {
                    displayName: 'Is Active',
                    type: 'boolean'
                }
            },
            views: {
                'list': ['name', 'birth', 'isActive']
            }
        }
    }
}

module.exports = models;