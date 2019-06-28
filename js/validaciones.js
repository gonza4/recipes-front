
function limpiarCampos() {

    $('.fstChoiceRemove').click();  
    document.getElementById("RecipesClub").value = "";
    document.getElementById("formIngredientes").innerHTML="";
    $('#frm').trigger("reset");  
   document.getElementById("procedimiento").innerHTML="";
  // document.getElementById("procedimiento").value = " ";
   document.getElementById("linkProcedimiento").innerHTML="";
   document.getElementById("linkProcedimiento").value = "";
   document.getElementById("lblIngredientes").innerHTML = "";
   document.getElementById("lblSelect").innerHTML = "";
   document.getElementById("btnGuardar").disabled=false;
}

function borrarCategoria(){
  categorias = $('#select').val();
  //console.log(categorias);

  cantCategoriasSeleccionadas =  categorias.length;
 // console.log("Cantidad de categorias seleccionadas: "+ cantCategoriasSeleccionadas);
  //if ($('.fstQueryInput').focus == true && $('.fstQueryInput').value="") {
    var ultimaCatSeleccionada;
  //  totalDeCategorias=categorias[cantCategoriasSeleccionadas];
  //  console.log("total de categorias seleccionadas: " + totalDeCategorias);
    
    for (var i =0; i <= categorias.length; i++) {
        if (cantCategoriasSeleccionadas=i) {
        ultimaCatSeleccionada= categorias[i-1];
   //        console.log("la ultima categoria es:"+ ultimaCatSeleccionada);
           
        }
        for (var j = 0; j < categorias.length; j++) {
              if(ultimaCatSeleccionada == categorias[j]){
     //           console.log("Es correcto");
                $('fstChoiceRemove').click();
              }
           }
        
    }
    //fstChoiceRemove la x q se tiene q cerrar
    //fstChoiceItem itemSeleccionado
    //data-value  es el valor a comparar para poder borrarlo 
  }
 //}


/*PARA AGREGAR Y QUITAR INGREDIENTES*/
$(document).ready(function(){
    //Hide clear btn on page load
    $('#clear').hide();
    //Add text input to list on button press
    $('#add').click(function(){
        //var toAdd gets the value of the input field
        var toAdd = $("input[name=checkListItem]").val();
        //Append list item in its own div with a class of item into the list div
        //It also changes the cursor on hover of the appended item 
        $('.listIng').append('<div class="item">' + toAdd + ' </div>');
        //fade in clear button when the add button is clicked
        $('#clear').fadeIn('fast');
        //Clear input field when add button is pressed
       // $('input').val('');
       document.getElementById("nuevoIngrediente").value = "";
       document.getElementById("lblIngredientes").innerHTML = "";
        
    });
    //Checks off items as they are pressed
    $(document).on('click', '.item', function() {
        //Chamge list item to red
        $(this).css("color", "#cc0000");
        //Change cursor for checked item
        $(this).css("cursor","default");
        //Strike through clicked item while giving it a class of done so it will be affected by the clear
        $(this).wrapInner('<strike class="done"></strike>');
        //Add the X glyphicon
        $(this).append(" " + '<span class="glyphicon glyphicon-remove done" aria-hidden="true"></span>');
        //Stops checked off items from being clicked again
        $(this).prop('disabled', true);
         $('.done').remove('.done');
    });
    //Removes list items with the class done
  //  $('#clear').click(function(){
   //     $('.done').remove('.done');
   // });
});






/*CODIGO PARA LA VISTA PREVIA DE LA IMAGEN*/
window.imagenVacia = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

window.mostrarVistaPrevia = function mostrarVistaPrevia() {

    var Archivos, Lector;

    //Para navegadores antiguos
    if (typeof FileReader !== "function") {
        jQuery('#infoNombre').text('[Vista previa no disponible]');
        jQuery('#infoTamaño').text('(su navegador no soporta vista previa!)');
        return;
    }

    Archivos = jQuery('#RecipesClub')[0].files;
    if (Archivos.length > 0) {

        Lector = new FileReader();
        Lector.onloadend = function (e) {
            var origen, tipo;

            //Envia la imagen a la pantalla
            origen = e.target; //objeto FileReader
            //Prepara la información sobre la imagen
            tipo = window.obtenerTipoMIME(origen.result.substring(0, 30));

            //    jQuery('#infoNombre').text(Archivos[0].name + ' (Tipo: ' + tipo + ')');
            //  jQuery('#infoTamaño').text('Tamaño: ' + e.total + ' bytes');
            //Si el tipo de archivo es válido lo muestra, 
            //sino muestra un mensaje 
            if (tipo !== 'image/jpeg' && tipo !== 'image/png' && tipo !== 'image/gif') {
                jQuery('#vistaPrevia').attr('src', "http://recipes-club.s3-website.us-east-2.amazonaws.com/img/imagen_no_disponible.jpeg");
                alert('El formato de imagen no es válido: debe seleccionar una imagen JPG, PNG o GIF.');
            } else {
                jQuery('#vistaPrevia').attr('src', origen.result);
                //    window.obtenerMedidas();
            }

        };
        Lector.onerror = function (e) {
            console.log(e)
        }
        Lector.readAsDataURL(Archivos[0]);

    } else {
        var objeto = jQuery('#RecipesClub');
        objeto.replaceWith(objeto.val('').clone());
        jQuery('#vistaPrevia').attr('src', window.imagenVacia);
        jQuery('#infoNombre').text('[Seleccione una imagen]');
        jQuery('#infoTamaño').text('');
    };


};

//Lee el tipo MIME de la cabecera de la imagen
window.obtenerTipoMIME = function obtenerTipoMIME(cabecera) {
    return cabecera.replace(/data:([^;]+).*/, '\$1');
}

//Obtiene las medidas de la imagen y las agrega a la 
//etiqueta infoTamaño
//window.obtenerMedidas = function obtenerMedidas() {
//    jQuery('<img/>').bind('load', function(e) {
//
//        var tamaño = jQuery('#infoTamaño').text() + '; Medidas: ' + this.width + 'x' + this.height;
//
//      jQuery('#infoTamaño').text(tamaño);

//}).attr('src', jQuery('#vistaPrevia').attr('src'));
//}

jQuery(document).ready(function () {

    //Cargamos la imagen "vacía" que actuará como Placeholder
    jQuery('#vistaPrevia').attr('src', "http://recipes-club.s3-website.us-east-2.amazonaws.com/img/imagen_no_disponible.jpeg");

    //El input del archivo lo vigilamos con un "delegado"
    jQuery('#botonera').on('change', '#RecipesClub', function (e) {
        window.mostrarVistaPrevia();
    });

    //El botón Cancelar lo vigilamos normalmente
    //  jQuery('#cancelar').on('click', function(e) {
    //    var objeto = jQuery('#archivo');
    //   objeto.replaceWith(objeto.val('').clone());

    // jQuery('#vistaPrevia').attr('src', window.imagenVacia);
    //  jQuery('#infoNombre').text('[Seleccione una imagen]');
    // jQuery('#infoTamaño').text('');
    //});

});

function imgPorDefecto() {

    jQuery('#vistaPrevia').attr('src', "http://recipes-club.s3-website.us-east-2.amazonaws.com/img/imagen_no_disponible.jpeg");
    document.getElementById("linkProcedimiento").style.display = "block";
    document.getElementById("procedimiento").style.display = "none";
    //document.getElementById("procedimiento").value = " ";
    limpiarCampos();   

}

function mostrar(opcion) {
    if (opcion == "1") {
        document.getElementById("linkProcedimiento").style.display = "block";
        document.getElementById("procedimiento").style.display = "none";
    } else {
        document.getElementById("linkProcedimiento").style.display = "none";
        document.getElementById("procedimiento").style.display = "block";

    }
}


function nospaces(t){
    texto = document.getElementById("entrada").value;
     if (texto.length <= 3) {
        if(t.value.match(/\s/g)){
          t.value=t.value.replace(/\s/g,'');
     }
  }
}

function nospaces2(t){
    texto = document.getElementById("texto").value;
     if (texto.length <= 3) {
        if(t.value.match(/\s/g)){
          t.value=t.value.replace(/\s/g,'');
     }
  }
}

function validarUrl(url){

var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
var t = url.value;

if (t.match(regex)) {
    
    document.getElementById("lbllinkprocedimiento").innerHTML = '';
  } else {
    document.getElementById("lbllinkprocedimiento").innerHTML = 'Formato incorrecto debe ser www.pagina.com o  http://www.pagina.com';
}
}


  $('#cantPorciones').on('input', function(e) {
   this.setCustomValidity('')
     
     this.reportValidity();
   })

  $('#totalCalorias').on('input', function(e) {
   this.setCustomValidity('')
    
     this.reportValidity();
   })

   $('#linkProcedimiento').on('input', function(e) {
   this.setCustomValidity('')
    this.reportValidity();
   })

