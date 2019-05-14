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
    //
    $scope.categoria;
    $scope.catPrincipales;
    $scope.otrasCat;

    // funciones
    $scope.buscarCategorias=function(){
        $scope.pantalla="listado" //aqui va home
        $scope.procesando++;
        $http({
            url: $scope.url + "/api/categories",
            method: 'GET',
            
        }).then(function exito(respose) {
            $scope.categoria = respose.data;
            $scope.procesando--;
           
            console.log("todas las cat");   
            console.log($scope.categoria);
        
console.log("cat principales")
          $scope.catPrincipales= $scope.categoriasPrincipales($scope.categoria);
          console.log($scope.catPrincipales);
        }, function fracaso(respose) {
            $scope.categoria = "error get en buscarCategoria()";
            $scope.procesando--;

            console.log($scope.categoria);
        });
    }

    $scope.categoriasPrincipales=function(parametro){

        
      
     /*    for(cat in parametro){

            console.log(cat);
            console.log(parametro);
               for(cv in c.DietLabels){
                    console.log(cv);
                    if (cv.labels=="Vegana"|| cv=="Vegetariana"|| cv=="Baja en carbohidratos"||cv=="Balanceado") {}
                       $scope.catPrincipales+=respose.data;
     console.log($scope.catPrincipales);
                }
                for(cv in c.HealthLabels.values){
                    if (cv=="Libre de Lacteos") {}
                       $scope.catPrincipales+=respose.data;
     console.log($scope.catPrincipales);
                }

        
    }*/
        console.log($scope.catPrincipales);
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
            url: $scope.url + "/api/recipe/byId/" + $scope.idReceta , 
            method: 'GET',
            
        }).then(function exito(respose) {
            $scope.receta = respose.data;
            $scope.procesando--;
            console.log($scope.receta);
           

        }, function fracaso(respose) {
            $scope.receta = "error get en buscarReceta()";
            $scope.procesando--;

            console.log($scope.receta);
           
        });
    }

    
    // busco recetas por default para mostrar en la homepage
    $scope.buscarRecetas($scope.q,$scope.pag);

});