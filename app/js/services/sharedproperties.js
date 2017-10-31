angular.module('myApp')
        .service('sharedProperties', function () {
            var objeto = {};
            var list = [];

            return {
                getObject: function () {
                    return objeto;
                },
                setObject: function (value) {
                    objeto = value;
                },
                getList: function () {
                    console.log("getList");
                    console.log(list);
                    return list;
                },
                setList: function (value) {
                    list = value;
                    console.log("setList");
                    console.log(list);
                }
            }
        });