
function limpiarCampos() {
    document.getElementById("archivo").value = "";
    //document.getElementById("tokens").select.selectedIndex = -1;;
    //falta agregar q las categorias seleccionadas dejen de estarlo
    console.log(document.getElementById("tokens").length);
    for (i = 0; i < document.getElementById("tokens").length; i++) {
        if (document.getElementById("tokens").length[i].selected == true) {
            document.getElementById("tokens").length[i].selected = false;
        }
    }
}

$(document).ready(function(){
    //Hide clear btn on page load
    $('#clear').hide();
    //Add text input to list on button press
    $('#add').click(function(){
        //var toAdd gets the value of the input field
        var toAdd = $("input[name=checkListItem]").val();
        //Append list item in its own div with a class of item into the list div
        //It also changes the cursor on hover of the appended item 
        $('.listIng').append('<div class="item">' + toAdd + '</div>');
        //fade in clear button when the add button is clicked
        $('#clear').fadeIn('fast');
        //Clear input field when add button is pressed
       // $('input').val('');
       document.getElementById("nuevoIngrediente").value = "";
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
    });
    //Removes list items with the class done
    $('#clear').click(function(){
        $('.done').remove('.done');
    });
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

    Archivos = jQuery('#archivo')[0].files;
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
                jQuery('#vistaPrevia').attr('src', window.imagenVacia);
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
        var objeto = jQuery('#archivo');
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
    jQuery('#botonera').on('change', '#archivo', function (e) {
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
    document.getElementById("procedimiento").value = " ";

}

function mostrar(opcion) {
    if (opcion == "1") {
        document.getElementById("linkProcedimiento").style.display = "block";
        document.getElementById("procedimiento").style.display = "none";
        //   document.getElementById("procedimiento").value=" ";
        //         document.getElementById("linkProcedimiento").value="";

    } else {
        document.getElementById("linkProcedimiento").style.display = "none";
        //  	document.getElementById("linkProcedimiento").value=" ";
        document.getElementById("procedimiento").style.display = "block";
        //    document.getElementById("procedimiento").value="";


    }
}

function confirmacionGuardado() {
    alert("Receta agregada con exito");
}