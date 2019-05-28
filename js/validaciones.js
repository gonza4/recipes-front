

function vistaPrevia(){
document.getElementById("file").onchange = function(e) {
	
	
	let reader = new FileReader();
  
  reader.onload = function(){
    let preview = document.getElementById('preview'),
    		image = document.createElement('img');

    image.src = reader.result;
    
    preview.innerHTML = '';
    preview.append(image);
  };
 
  reader.readAsDataURL(e.target.files[0]);
}
}

function limpiarCampos(){
	document.getElementById("file").value="";
	document.getElementById("preview").innerHTML="";
}

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
