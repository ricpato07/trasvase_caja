angular.module('myApp')
        .service('sharedProperties', function () {
            var objeto = {};
            var list = [];
            var estado = {};

            return {
                getObject: function () {
                    console.log("getObject");
                    console.log(objeto);
                    return objeto;
                },
                setObject: function (value) {
                    console.log("setObject");
                    console.log(value);
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
                },
                getEstado: function () {
                    console.log("getEstado");
                    console.log(estado);
                    return estado;
                },
                setEstado: function (value) {
                    estado = value;
                    console.log("setEstado");
                    console.log(estado);
                }
            }
        });