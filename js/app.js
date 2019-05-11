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
    $scope.url = "http://ec2-18-219-208-158.us-east-2.compute.amazonaws.com:5000";
    $scope.q = "vegetales";
    $scope.pag = 1;
    $scope.idReceta=0;

    // funciones
    $scope.buscarCategorias=function(){
        $scope.pantalla="home"
        $scope.procesando++;
        $http({
            url: $scope.url + "id de las categorias",//completar
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
     $scope.anteriorPag = function() {
        $scope.pag--;
        $scope.buscarRecetasOrdenadas($scope.pag, $scope.orderType,$scope.order);
        window.scrollTo(0, 0);
    }

     $scope.buscarReceta = function (r) {

        $scope.procesando++;
        $scope.pantalla = 'listado';

        $http({
            url: $scope.url + "/api/recipe/byId/0", 
            method: 'GET',
            
        }).then(function exito(respose) {
            $scope.receta = respose.data;
            $scope.procesando--;
            console.log($scope.receta);
            infoNutricional($scope.receta);

        }, function fracaso(respose) {
            $scope.receta = "error get en buscarReceta()";
            $scope.procesando--;

            console.log($scope.receta);
           
        });
    }

    
    // busco recetas por default para mostrar en la homepage
    $scope.buscarRecetas($scope.q,$scope.pag);

});