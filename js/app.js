var app = angular.module("myApp", []);

app.controller("myController", function ($scope, $http) {

    // variables
    $scope.pantalla = "listado";
    $scope.orderType;
    $scope.order;
    $scope.procesando = 0;
    $scope.recetas;
    $scope.receta;
    $scope.r = "";
    $scope.url = "http://18.191.243.135:5000";
    $scope.q = "vegetales";
    $scope.pag = 1;

    // funciones
    $scope.buscarRecetas = function (q,pag) {

        $scope.pantalla = "listado"
        $scope.procesando++;
        $scope.q = q;

        $http({
            url: $scope.url + "/api/recipes",
            method: 'GET',
            params: {
                q: q,
                from: pag
            }
        }).then(function exito(respose) {
            $scope.recetas = respose.data;
            $scope.procesando--;

        }, function fracaso(respose) {
            $scope.respuesta = "error get en buscarRecetas()";
            $scope.procesando--;
        });
    };

    $scope.buscarRecetasOrdenadas = function (pag, orderType,order) {

        $scope.pantalla = "listado"
        $scope.procesando++;

        $http({
            url: $scope.url + "/api/recipes",
            method: 'GET',
            params: {
                q: $scope.q, // de consulta anterior
                from: pag,
                orderType: orderType, 
                order: order
            }
        }).then(function exito(respose) {
            $scope.recetas = respose.data;
            $scope.procesando--;

        }, function fracaso(respose) {
            $scope.respuesta = "error get en buscarRecetas()";
            $scope.procesando--;
        });

        $scope.orderType = orderType;
        $scope.order = order;
    };

    $scope.siguientePag = function() {
        $scope.pag++;
        $scope.buscarRecetasOrdenadas($scope.pag, $scope.orderType,$scope.order);
        window.scrollTo(0, 0);
    }


    $scope.buscarReceta = function (r) {

        $scope.procesando++;
        $scope.pantalla = 'detalle';

        $http({
            url: $scope.url + "/api/recipe/byId",
            method: 'GET',
            params: {
                r: r
            }
        }).then(function exito(respose) {
            $scope.receta = respose.data;
            $scope.procesando--;

        }, function fracaso(respose) {
            $scope.receta = "error get en buscarReceta()";
            $scope.procesando--;
        });
    }

    // busco recetas por default para mostrar en la homepage
    $scope.buscarRecetas($scope.q,$scope.pag);

});