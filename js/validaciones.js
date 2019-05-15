function validar(frm) { 
	
	if (frm.txtBuscar.value.length<3 || frm.txtBuscar.value.length ==0) { 

		toastr.options = {
			
			"positionClass": "toast-top-center",
			"preventDuplicates": true
		}

		toastr["error"]("Minimo 3 caracteres", "Error")
	
		frm.txtBuscar.focus(); 

		return false;
	} 
	return true;
} 


function mostrarOtrasCategorias(id){

if(document.getElementById(id).style.display == 'block'){
	document.getElementById(id).style.display ='none';
	document.getElementById('b'+id).value='Ver Mas';
}else{
	document.getElementById(id).style.display = 'block';
	document.getElementById('b'+id).value= 'Ocultar';
}
//if (document.getElementById){ //se obtiene el id
//var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
//el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
//}
}
//window.onload = function(){/*hace que se cargue la función lo que predetermina que div estará oculto hasta llamar a la función nuevamente*/
//muestra_oculta('contenido');/* "contenido_a_mostrar" es el nombre que le dimos al DIV */
//}

function muestra_oculta(id){
if (document.getElementById){ //se obtiene el id
var el = document.getElementById(id); //se define la variable "el" igual a nuestro div
el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
}
}
window.onload = function(){/*hace que se cargue la función lo que predetermina que div estará oculto hasta llamar a la función nuevamente*/
muestra_oculta('contenido_a_mostrar');/* "contenido_a_mostrar" es el nombre de la etiqueta DIV que deseamos mostrar */
}