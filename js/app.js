var app = angular.module("myApp", []);

app.config(['$locationProvider', function ($locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.controller("myController", function ($scope, $http, $location) {

    // variables
    $scope.pantalla = "listado";
    $scope.orderType;
    $scope.order;
    $scope.procesando = 0;
    $scope.recetas;
    $scope.receta;
    $scope.r = "";
    $scope.url = "http://ec2-18-221-188-151.us-east-2.compute.amazonaws.com:5000";
    $scope.category = "HealthLabels";
    $scope.relation = "HEALTH_LABELS";
    $scope.value = "Vegana";
    $scope.from = 1;
    $scope.categorias = "hola";
    $scope.texto = "";
    $scope.dondeEstoy = "";
    $scope.totalPages;

    // funciones

    $scope.leerParametros = function () {
        $scope.category = $location.search()['category'];
        $scope.DietLabels = $location.search()['DietLabels'];
        $scope.from = $location.search()['from'];
        $scope.relation = $location.search()['relation'];
        $scope.value = $location.search()['value'];
        $scope.texto = $location.search()['texto'];

    }

    $scope.buscarCategorias = function () {

        $scope.procesando++;
        $http({
            url: $scope.url + "/api/categories",
            method: 'GET'

        }).then(function exito(respose) {
            $scope.categorias = respose.data;
            $scope.procesando--;
        }, function fracaso(respose) {
            $scope.categorias = "error get en buscarCategoria()";
            $scope.procesando--;
        });
    }

    $scope.buscarRecetas = function (category, relation, value, from, texto) {

        $scope.pantalla = "listado"
        $scope.procesando++;
        $scope.category = category;
        $scope.relation = relation;
        $scope.value = value;
        $scope.from = from;
        $scope.texto = texto;

        if (texto == null) {
            $scope.dondeEstoy = "Categoría: " + value;
            $http({
                url: $scope.url + "/api/recipes",
                method: 'GET',
                params: {
                    category: category,
                    relation: relation,
                    value: value,
                    from: from
                }
            }).then(function exito(respose) {
                $scope.recetas = respose.data;
                if ($scope.recetas.length < 1) {
                    $scope.totalPages = 0;
                }


                var aux = 0;
                for (var i = 0; i < $scope.recetas.length; i++) {
                    aux = $scope.recetas[i].totalPages;

                    break;
                }
                $scope.totalPages = aux;
                $scope.procesando--;

            }, function fracaso(respose) {
                $scope.respuesta = "error get en buscarRecetas()";
                $scope.procesando--;
            });
        } else {
            $scope.dondeEstoy = "Búsqueda: " + texto;
            $http({
                url: $scope.url + "/api/recipe/search/" + texto,
                method: 'GET',
                params: {
                    from: from
                }
            }).then(function exito(respose) {
                $scope.recetas = respose.data;
                if ($scope.recetas.length < 1) {
                    $scope.totalPages = 0;
                }

                var aux = 0;
                for (var i = 0; i < $scope.recetas.length; i++) {
                    aux = $scope.recetas[i].totalPages;
                    break;
                }
                $scope.totalPages = aux;
                $scope.procesando--;

            }, function fracaso(respose) {
                $scope.respuesta = "error get en buscarRecetas()";
                $scope.procesando--;
            });

        }
    };

    $scope.buscarRecetasOrdenadas = function (from, orderType, order) {

        $scope.pantalla = "listado"
        $scope.procesando++;

        $http({
            url: $scope.url + "/api/recipes",
            method: 'GET',
            params: {
                category: $scope.category, // de consulta anterior
                from: from,
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

    $scope.siguientePag = function () {
        $scope.from++;
        $scope.buscarRecetas($scope.category, $scope.relation, $scope.value, $scope.from, $scope.texto);
        window.scrollTo(0, 0);
    }

    $scope.anteriorPag = function () {
        if ($scope.from == 0) return;
        $scope.from--;
        $scope.buscarRecetas($scope.category, $scope.relation, $scope.value, $scope.from, $scope.texto);
        window.scrollTo(0, 0);
    }


    $scope.buscarReceta = function (id) {

        $scope.procesando++;
        $scope.pantalla = 'listado';

        $http({
            url: $scope.url + "/api/recipe/byId/" + id,
            method: 'GET',

        }).then(function exito(respose) {
            $scope.receta = respose.data;
            $scope.procesando--;


        }, function fracaso(respose) {
            $scope.receta = "error get en buscarReceta()";
            $scope.procesando--;
        });
    }

    $scope.guardarReceta = function (formTitulo, formCategorias, formImagen, formPorciones, formCalorias, formTextProcedimiento, formLinkProcedimiento) {

        var ingreds = [];
        var objChl  = document.getElementById('formIngredientes').children; 
        for (i = 0; i <= objChl.length - 1; i++) {
          	ingreds.push(objChl[i].innerHTML);
        }

        var dietLabels = [];
        var healthLabels = [];

        formCategorias.forEach(element => {
            if($scope.categorias[0].DietLabels.values.includes(element)) { dietLabels.push(element) }
            if($scope.categorias[1].HealthLabels.values.includes(element)) { healthLabels.push(element) }
        });

        var recetaNva = {
            "image": formImagen,
            "yield": formPorciones,
            "calories": formCalorias,
            "label": formTitulo,
            "url": formLinkProcedimiento,
            "procedure": formTextProcedimiento,
            "dietLabels": dietLabels,
            "healthLabels": healthLabels,
            "ingredientLines": ingreds,
            "totalNutrients": null
        }

        var formData = new FormData();
        formData.append('data', angular.toJson(recetaNva));
        formData.append('RecipesClub', $('input[type=file]')[0].files[0]); 
        
        $scope.procesando++;

        $http({
            url: $scope.url + "/api/recipe",
            method: 'POST',
            data: formData

        }).then(function exito(respose) {
            $scope.procesando--;
            alert("Receta guardada con exito");

        }, function fracaso(respose) {
            $scope.procesando--;
            alert("Algo falló");
        });
    }

    // al inicio
    $scope.buscarCategorias();
    $scope.leerParametros();
    setTimeout($scope.buscarRecetas($scope.category, $scope.relation, $scope.value, $scope.from, $scope.texto), 3000);
});