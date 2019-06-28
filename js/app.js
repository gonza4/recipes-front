var app = angular.module("myApp", []);

app.config([
  "$locationProvider",
  function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);

app.controller("myController", function($scope, $http, $location) {
  // variables
  $scope.pantalla = "listado";
  $scope.orderType;
  $scope.order;
  $scope.procesando = 0;
  $scope.recetas;
  $scope.receta;
  $scope.r = "";
  $scope.url = "http://ec2-18-220-217-216.us-east-2.compute.amazonaws.com:5000";
  $scope.category = "HealthLabels";
  $scope.relation = "HEALTH_LABELS";
  $scope.value = "Vegana";
  $scope.from = 1;
  $scope.categorias = "hola";
  $scope.texto = "";
  $scope.dondeEstoy = "";
  $scope.totalPages;

  // funciones

  $scope.leerParametros = function() {
    $scope.category = $location.search()["category"];
    $scope.DietLabels = $location.search()["DietLabels"];
    $scope.from = $location.search()["from"];
    $scope.relation = $location.search()["relation"];
    $scope.value = $location.search()["value"];
    $scope.texto = $location.search()["texto"];
  };

  $scope.buscarCategorias = function() {
    $scope.procesando++;
    $http({
      url: $scope.url + "/api/categories",
      method: "GET"
    }).then(
      function exito(respose) {
        $scope.categorias = respose.data;
        $scope.procesando--;
      },
      function fracaso(respose) {
        $scope.categorias = "error get en buscarCategoria()";
        $scope.procesando--;
      }
    );
  };

  $scope.buscarRecetas = function(category, relation, value, from, texto) {
    $scope.pantalla = "listado";
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
        method: "GET",
        params: {
          category: category,
          relation: relation,
          value: value,
          from: from
        }
      }).then(
        function exito(respose) {
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
        },
        function fracaso(respose) {
          $scope.respuesta = "error get en buscarRecetas()";
          $scope.procesando--;
        }
      );
    } else {
      $scope.dondeEstoy = "Búsqueda: " + texto;
      $http({
        url: $scope.url + "/api/recipe/search/" + texto,
        method: "GET",
        params: {
          from: from
        }
      }).then(
        function exito(respose) {
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
          document.getElementById("entrada").value = "";
          $scope.procesando--;
        },
        function fracaso(respose) {
          $scope.respuesta = "error get en buscarRecetas()";
          $scope.procesando--;
        }
      );
    }
  };

  $scope.buscarRecetasOrdenadas = function(from, orderType, order) {
    $scope.pantalla = "listado";
    $scope.procesando++;

    $http({
      url: $scope.url + "/api/recipes",
      method: "GET",
      params: {
        category: $scope.category, // de consulta anterior
        from: from,
        orderType: orderType,
        order: order
      }
    }).then(
      function exito(respose) {
        $scope.recetas = respose.data;
        $scope.procesando--;
      },
      function fracaso(respose) {
        $scope.respuesta = "error get en buscarRecetas()";
        $scope.procesando--;
      }
    );

    $scope.orderType = orderType;
    $scope.order = order;
  };

  $scope.siguientePag = function() {
    $scope.from++;
    $scope.buscarRecetas(
      $scope.category,
      $scope.relation,
      $scope.value,
      $scope.from,
      $scope.texto
    );
    window.scrollTo(0, 0);
  };

  $scope.anteriorPag = function() {
    if ($scope.from == 0) return;
    $scope.from--;
    $scope.buscarRecetas(
      $scope.category,
      $scope.relation,
      $scope.value,
      $scope.from,
      $scope.texto
    );
    window.scrollTo(0, 0);
  };

  $scope.buscarReceta = function(id) {
    $scope.procesando++;
    $scope.pantalla = "listado";

    $http({
      url: $scope.url + "/api/recipe/byId/" + id,
      method: "GET"
    }).then(
      function exito(respose) {
        $scope.receta = respose.data;
        $scope.procesando--;
      },
      function fracaso(respose) {
        $scope.receta = "error get en buscarReceta()";
        $scope.procesando--;
      }
    );
  };

  $scope.guardarReceta = function(
    formTitulo,
    formCategorias,
    formImagen,
    formPorciones,
    formCalorias,
    formTextProcedimiento,
    formLinkProcedimiento
  ) {
    document.getElementById("btnGuardar").disabled = true;
    //TITULO
    if (typeof formTitulo == "undefined" || formTitulo == "") {
      document.getElementById("btnGuardar").disabled = false;
      console.log("******************RETURN DE TITULO******************");
      return;
    }

    // CATEGORIAS
    var dietLabels = [];
    var healthLabels = [];

    formCategorias = $("#select").val();
    console.log(formCategorias);
    formCategorias.forEach(element => {
      if ($scope.categorias[0].DietLabels.values.includes(element)) {
        dietLabels.push(element);
      }
      if ($scope.categorias[1].HealthLabels.values.includes(element)) {
        healthLabels.push(element);
      }
    });
    //validacion de las categorias
    if (dietLabels.length == 0 && healthLabels.length == 0) {
      document.getElementById("lblSelect").innerHTML =
      ("Se debe seleccionar al menos una categoria");
      console.log(
        "*********************RETURN DE CATEGORIAS***********************"
      );
      document.getElementById("btnGuardar").disabled = false;
      return;
    } else {
      document.getElementById("lblSelect").innerHTML = "";
    }

    //INGREDIENTES
    var ingreds = [];
    var objChl = document.getElementById("formIngredientes").children;
    for (i = 0; i <= objChl.length - 1; i++) {
      if (objChl[i].innerHTML != " ") {
        ingreds.push(objChl[i].innerHTML);
      }
    }

    //validacion de la cant de ingredientes
    if (ingreds.length < 1) {
      document.getElementById("lblIngredientes").innerHTML =
        "Se debe ingresar al menos un ingrediente";

      document.getElementById("btnGuardar").disabled = false;
      return;
    } else {
      document.getElementById("lblIngredientes").innerHTML = "";
    }

    //PROCEDIMIENTO
    // para borrar el procedimiento q no esta visible y validar las cajas de texto
    var link = document.getElementById("linkProcedimiento");
    var proce = document.getElementById("procedimiento");

    if (link.style.display == "block") {
      if (
        typeof formLinkProcedimiento == "undefined" ||
        formLinkProcedimiento == ""
      ) {
        document.getElementById("btnGuardar").disabled = false;
        console.log(
          "*********************RETURN DE LINK***********************"
        );
        return;
      } else {
        formTextProcedimiento = "";
        console.log("texto del link (block): " + formLinkProcedimiento);
        console.log("texto del text area: " + formTextProcedimiento);
        console.log("texto del porciones: " + formPorciones);
        console.log("texto del calorias: " + formCalorias);
      }
    } else {
      //cuando el text area esta habilitado

      if (
        typeof formTextProcedimiento == "undefined" ||
        formTextProcedimiento == ""
      ) {
        document.getElementById("btnGuardar").disabled = false;
        console.log(
          "******************RETURN DE PROCEDIMIENTO******************"
        );
        return;
      } else {
        formLinkProcedimiento = "";
        console.log("texto del link " + formLinkProcedimiento);
        console.log("texto del text area (block)" + formTextProcedimiento);
      }
    }

    //CALORIAS/PORCIONES
    //Validacion de cantidad de porciones y calorias
    if (
      typeof formCalorias == "undefined" ||
      formCalorias == "" ||
      typeof formPorciones == "undefined" ||
      formPorciones == ""
    ) {
      document.getElementById("btnGuardar").disabled = false;
      console.log(
        "******************RETURN DE CALORIAS/PORCIONES******************"
      );
      return;
    }

    //INFO NUTRICIONAL
    // carga de info nutricional
    var nutri_dom = document.getElementsByClassName("nutri");
    var nutri = [];
    for (i = 0; i < nutri_dom.length; i++) {
      var obj = { label: "", quantity: "", unit: "" };
      obj.label = nutri_dom[i].children[0].children[0].value;
      obj.unit = nutri_dom[i].children[2].children[0].value;
      obj.quantity = nutri_dom[i].children[1].children[0].value;
      if (obj.quantity != "") {
        nutri.push(obj);
      }
    }

    console.log(nutri);
    console.log("1 creo jason");
    recetaNva = {
      yield: formPorciones,
      calories: formCalorias,
      label: formTitulo,
      url: formLinkProcedimiento,
      procedure: formTextProcedimiento,
      dietLabels: dietLabels,
      healthLabels: healthLabels,
      ingredientLines: ingreds,
      totalNutrients: nutri
    };

    console.log("2 carga la image");
    var formData = new FormData();
    var image = $("#RecipesClub")[0].files[0];
    formData.append("RecipesClub", image);

    console.log("2.1 hago el if y el return");

    console.log("3 cargo el form data para guardar");
    for (key in recetaNva) {
      formData.append(key, angular.toJson(recetaNva[key]));
    }

    $scope.procesando++;
    console.log(recetaNva);

    console.log("4 hago el envio por post");
    $http
      .post($scope.url + "/api/recipe", formData, {
        transformRequest: angular.identity,
        headers: {
          "Content-Type": undefined
        }
      })
      .then(
        function exito(respose) {
          $scope.procesando--;
          $scope.formLinkProcedimiento = "";
          $scope.formCalorias = "";
          $scope.formPorciones = "";
          $scope.formTextProcedimiento = "";

          $("#errorMessage").html("Receta guardada con exito");
          $('#myModal').modal()
          $('#errorModal').modal("show");
        },
        function fracaso(respose) {
          $scope.procesando--;
          $("#errorMessage").html("Hubo un problema al guardar la receta");
          $('#myModal').modal()
          $('#errorModal').modal("show");
        }
      );
  };

  // al inicio
  $scope.buscarCategorias();
  $scope.leerParametros();
  $scope.buscarRecetas(
    $scope.category,
    $scope.relation,
    $scope.value,
    $scope.from,
    $scope.texto
  );
});
