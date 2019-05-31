
function limpiarCampos(){
	document.getElementById("archivo").value="";
	document.getElementById("preview").innerHTML="";
	//falta agregar q las categorias seleccionadas dejen de estarlo
}
function toastOptions(){
	toastr.options = {
			
			"positionClass": "toast-top-center",
			"preventDuplicates": true
		}

}

function validar(frm) { 
	//validar titulo nueva Receta	
	if (frm.titulo.value.length==0) {
		toastOptions();
		toastr["error"]("Este campo es requerido", "Error")
		
		frm.titulo.focus(); 

		return false;
	}

	if (frm.txtBuscar.value.length<3 || frm.txtBuscar.value.length ==0) { 

		
		toastr["error"]("Minimo 3 caracteres", "Error")
		
		frm.txtBuscar.focus(); 

		return false;
	} 
	
	if (validarSoloTexto(frm.txtBuscar.value)==false) {

		toastr.options = {
			
			"positionClass": "toast-top-center",
			"preventDuplicates": true
		}

		toastr["error"]("No se permiten valores numericos en la busqueda", "Error")
		
		frm.txtBuscar.focus(); 

		return false;
	}

	return true;
} 

function validarSoloTexto(parametro){
	var patron=/^[a-zA-Z\s]*$/;
	if (parametro.search(patron)) {
		return false;
	}else{
		return true;
	}
}
/*
function mostrarOtrasCategorias(id){

	if(document.getElementById(id).style.display == 'block'){
		document.getElementById(id).style.display ='none';
		if (document.getElementById('bmb').innerText="VER MENOS") {
			document.getElementById('bmb').innerText="VER MAS"
		}
	}else{
		document.getElementById(id).style.display = 'block';
		if (document.getElementById('bmb').innerText="VER MAS") {
			document.getElementById('bmb').innerText="VER MENOS"
		}
	}
}
*/
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
        Lector.onloadend = function(e) {
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
        Lector.onerror = function(e) {
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

jQuery(document).ready(function() {

    //Cargamos la imagen "vacía" que actuará como Placeholder
    jQuery('#vistaPrevia').attr('src', "http://recipes-club.s3-website.us-east-2.amazonaws.com/img/imagen_no_disponible.jpeg");

    //El input del archivo lo vigilamos con un "delegado"
    jQuery('#botonera').on('change', '#archivo', function(e) {
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

function imgPorDefecto(){

	jQuery('#vistaPrevia').attr('src', "http://recipes-club.s3-website.us-east-2.amazonaws.com/img/imagen_no_disponible.jpeg");
	document.getElementById("linkProcedimiento").style.display = "block";
    document.getElementById("procedimiento").style.display = "none";
    document.getElementById("procedimiento").value=" ";
  
}

	 function mostrar(dato){
        if(dato=="1"){
            document.getElementById("linkProcedimiento").style.display = "block";
            document.getElementById("procedimiento").style.display = "none";
            document.getElementById("procedimiento").value=" ";
            document.getElementById("linkProcedimiento").value="";
            
          }else{
          	document.getElementById("linkProcedimiento").style.display = "none";
          	document.getElementById("linkProcedimiento").value=" ";
            document.getElementById("procedimiento").style.display = "block";
             document.getElementById("procedimiento").value="";
          }
}

function confirmacionGuardado(){
	alert("Receta agregada con exito");
}