var app = angular.module("myApp", []);

app.controller("myController", function ($scope, $http) {

    // variables
    $scope.pantalla = "listado";
    $scope.orden_crit;
    $scope.orden_rev;
    $scope.procesando = 0;
    $scope.recetas = [];
    $scope.receta;
    $scope.r = "http://www.edamam.com/ontologies/edamam.owl#recipe_9b5945e03f05acbf9d69625138385408";
    $scope.url = "https://api.edamam.com/search";
    $scope.q = "vegetables";
    $scope.rece

    // funciones
    $scope.buscarRecetas = function (q) {

        $scope.pantalla = "listado"
        $scope.procesando++;
        $scope.orden_crit = "";
        $scope.orden_rev = "";

        $http({
            url: $scope.url,
            method: 'GET',
            params: {
                q: q,
                from: 0,
                to: 100,
                app_id: '81adf351',
                app_key: '46a6347c2e3680be25b7b56c99911ef8'
            }
        }).then(function exito(respose) {
            $scope.recetas = respose.data.hits;
            $scope.procesando--;

        }, function fracaso(respose) {
            $scope.respuesta = "error get en buscarRecetas()";
            $scope.procesando--;
        });
    };


    $scope.buscarReceta = function (r) {

        $scope.procesando++;
        $scope.pantalla = 'detalle';

        $http({
            url: $scope.url,
            method: 'GET',
            params: {
                r: r,
                app_id: '81adf351',
                app_key: '46a6347c2e3680be25b7b56c99911ef8'
            }
        }).then(function exito(respose) {
            $scope.receta = respose.data[0];
            $scope.procesando--;

        }, function fracaso(respose) {
            $scope.receta = "error get en buscarReceta()";
            $scope.procesando--;
        });
    }

    // busco recetas por default para mostrar en la homepage
    $scope.buscarRecetas($scope.q);

});