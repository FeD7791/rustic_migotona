const form = document.getElementById("form_crear_ceunta")
const inputs_form = form.elements;

/////////////////////// <p> tags ///////////////////////////////
const log_name = document.getElementById("log_name")
const log_apellido = document.getElementById("log_apellido")
const log_correo = document.getElementById("log_correo")
const log_f_nacimiento = document.getElementById("log_f_nacimiento")
const log_contrasenia = document.getElementById("log_contrasenia")
const log_contrasenia2 = document.getElementById("log_contrasenia2")
/////////////////////////////////////////////////////////////////

/////////////////////// input tags ////////////////////////////
const nombre_user = inputs_form["nombre"];
//const appellido_user = inputs_form["apellido"];
const correo_user = inputs_form["correo"];
//const f_nacimiento_user = inputs_form["fecha_de_nacimiento"];
const clave_user = inputs_form["contrasenia"];
///////////////////////////////////////////////////////////////


function logSubmit(){
    
    let regex_email_1 = /@/g
    let regex_email_2 = /.com/g
    let bolean_regex_1 = regex_email_1.test(correo_user.value)
    let bolean_regex_2 = regex_email_2.test(correo_user.value)

    if(bolean_regex_1 && bolean_regex_2){
        log_correo.textContent = ""
    }else{
        log_correo.textContent = "email invalido"
    }

}

function logSubmit_username(){
    
    let regex_user = /[a-zA-Z]{4,}/g
    let bolean_regex = regex_user.test(nombre_user.value)
    

    if(bolean_regex){
        log_name.textContent = ""
    }else{
        log_name.textContent = "Nombre debe tener 5 caracteres minimo"
    }

}

function logSubmit_password(){
    
    let regex_clave = /\d/
    let bolean_regex = regex_clave.test(clave_user.value)
    

    if(bolean_regex && clave_user.value.length >= 7){
        log_contrasenia.textContent = ""
    }else{
        log_contrasenia.textContent = "Clave debe tener 8 caracteres y almenos un numero"
    }

}

correo_user.addEventListener("keydown",logSubmit)
nombre_user.addEventListener("keydown",logSubmit_username)
clave_user.addEventListener("keydown" ,logSubmit_password )

function stopper(event){
    ///////////////////////////////////////////////
    const nombre_user = inputs_form["nombre"];
    const clave_user = inputs_form["contrasenia"];
    const correo_user = inputs_form["correo"];
    ///////////////////////////////////////////////
    let regex_clave = /\d/
    let regex_email = /(@|.com)/g
    ///////////////////////////////////////////////
    let bolean_regex = regex_clave.test(clave_user.value)
    let bolean_user = false;
    let bolean_clave = false;
    let bolean_email = regex_email.test(correo_user.value)
    ///////////////////////////////////////////////
    
    if(nombre_user.value.length > 5){bolean_user = true}
    if(clave_user.value.length >8){bolean_clave = true}
    ///////////////////////////////////////////////
    
    let final_bolean = bolean_user && bolean_clave && bolean_regex && bolean_email


    if(!final_bolean){
      
      event.preventDefault()
    }else{
      alert('formulario lleno')
      
    }
}
form.addEventListener("submit" , stopper)