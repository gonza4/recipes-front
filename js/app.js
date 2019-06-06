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
                console.log($scope.recetas);
                if ($scope.recetas.length < 1) {
                    $scope.totalPages = 0;
                }


                var aux = 0;
                for (var i = 0; i < $scope.recetas.length; i++) {
                    aux = $scope.recetas[i].totalPages;

                    break;
                }
                $scope.totalPages = aux;
                console.log("paginas " + $scope.totalPages);
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
                console.log($scope.recetas);
                if ($scope.recetas.length < 1) {
                    $scope.totalPages = 0;
                }

                var aux = 0;
                for (var i = 0; i < $scope.recetas.length; i++) {
                    aux = $scope.recetas[i].totalPages;
                    break;
                }
                $scope.totalPages = aux;
                console.log("paginas " + $scope.totalPages);
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
            console.log($scope.receta);


        }, function fracaso(respose) {
            $scope.receta = "error get en buscarReceta()";
            $scope.procesando--;

            console.log($scope.receta);

        });
    }

    $scope.guardarReceta = function (image, yield_, calories, label, url, procedure, dietLabels, healthLabels, ingredientLines, totalNutrients) {

        var recetaNva = {
            "image": image,
            "yield": yield_,
            "calories": calories,
            "label": label,
            "url": url,
            "procedure": procedure,
            "dietLabels": dietLabels,
            "healthLabels": healthLabels,
            "ingredientLines": ingredientLines,
            "totalNutrients": totalNutrients
        }

        $scope.procesando++;

        $http({
            url: $scope.url + "/api/recipe",
            method: 'POST',
            data: recetaNva

        }).then(function exito(respose) {
            $scope.receta = respose.data;
            $scope.procesando--;
            console.log(recetaNva);

        }, function fracaso(respose) {
            $scope.procesando--;
            console.log(recetaNva);
        });
    }

    // al inicio
    $scope.buscarCategorias();
    $scope.leerParametros();
    setTimeout($scope.buscarRecetas($scope.category, $scope.relation, $scope.value, $scope.from, $scope.texto), 3000);
});