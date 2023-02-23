/////////////// plus/minus button/////////////////////////
const button_plus = document.getElementById("button_plus")
const button_minus = document.getElementById("button_minus")
const input_space = document.getElementById("input_space")
///////////////////cart button////////////////////////
const cart_button = document.getElementsByClassName("cart_button")


//////////////////////////////////////////////////////////
function incrementar(){
    input_space.stepUp()
}

function disminuir(){
    input_space.stepDown()
}

///

///



button_minus.addEventListener("click",disminuir)
button_plus.addEventListener("click",incrementar)
cart_button[0].addEventListener("click",()=>{
    location.href = "/cart"
    
})

