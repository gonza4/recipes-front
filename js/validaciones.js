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
