window.addEventListener('load', loader)

        function loader(){
            let product_array = []
            for(let i=0; i <10; i++){
            let storage =  JSON.parse(localStorage.getItem(i))
            if(storage != null){
                product_array.push(storage)
                
            }
        }
        /////////Total compra////////////////////////////////
        let total_compra =document.getElementById("total_compra")

        ////////////////////////////////////// Funcion que modifica el precio total
        function precio_total_tag(){
            let precio_total = 0
            for(let k = 0; k< product_array.length ; k++ ){
                precio_total = precio_total + Number(product_array[k].cantidad)*Number(product_array[k].precio)
            }
            return precio_total
        }
        let precio_total = precio_total_tag()
        total_compra.innerText = String(precio_total)
        
        ///////////////////////////////////////////////////////
        
        for(let j=0 ; j < product_array.length ; j++){
            ///////////////////////////////////////////////////////
            const element_main_1_1 = document.createElement("div");//MAIN DIV
            ///////////////////////////////////////////////////////
            const element_main_1_2 = document.createElement("div");
            const element_p_box = document.createElement("div");
            const element_1_1_3 = document.createElement("div");
            const element_p_tag = document.createElement("p");
            const element_p_tag_2 = document.createElement("p")
            const button_delete_tag = document.createElement("button")
            const button_container_tag = document.createElement("div")
            const button_plus_tag = document.createElement("button");
            const button_minus_tag = document.createElement("button");

            element_main_1_1.className = "main_1_1"
        
            element_main_1_2.className = "main_1_2"
            element_p_box.className = "p_box"
            element_1_1_3.className = "main_1_3"
            //button_delete_tag.className = "boton_container"
            /////////////////////////////////////////////////////////////
            
            const url_image = product_array[j].imagen
            element_p_box.style.backgroundImage = 'url('+url_image+')'
            element_p_box.style.backgroundSize = 'cover'
            /////////////////////////doy ID  a los tag //////////////////
            element_main_1_1.id = product_array[j].nombre
            element_main_1_2.id = product_array[j].id
            /////////////////////////////////////////////////////////////
            const id_tag_main_1_2 = String(product_array[j].id) 
            const id_tag_main_1_1 = String(product_array[j].nombre)
            /////////////////////////////////////////////////////////////

            
            
            
            
            document.getElementsByClassName("main_1")[0].appendChild(element_main_1_1);
            document.getElementById(id_tag_main_1_1).appendChild(element_main_1_2);
            document.getElementById(id_tag_main_1_2).appendChild(element_p_box);
            document.getElementById(id_tag_main_1_2).appendChild(button_container_tag);
            document.getElementById(id_tag_main_1_1).appendChild(element_1_1_3);
            element_1_1_3.appendChild(element_p_tag)
            element_1_1_3.appendChild(element_p_tag_2)
            element_1_1_3.appendChild(button_delete_tag)
            button_container_tag.appendChild(button_plus_tag)
            button_container_tag.appendChild(button_minus_tag)

            button_delete_tag.textContent = "Eliminar Item"
            button_delete_tag.style.width = "10vh"
            button_plus_tag.textContent = "+"
            button_minus_tag.textContent = "-"

            element_p_tag.style.fontSize = '2vw'
            element_p_tag_2.style.fontSize = '2vw'
            element_p_tag.textContent = product_array[j].nombre + ' x ' + product_array[j].cantidad
            element_p_tag_2.textContent = 'Total: ' + product_array[j].cantidad * product_array[j].precio
            
            ///////////////////////// Script para borrar un producto ////////////////////////////////////
            button_delete_tag.addEventListener("click",()=>{
                const item = button_delete_tag.parentNode.parentNode.firstChild.id
                
                
                delete_item(item);
                location.reload();
            })
            function delete_item(arg){
                localStorage.removeItem(arg)
                /////////////////////Modify total price ///////////////////////////
                let precio_total = precio_total_tag()
                total_compra.innerText = String(precio_total)
            }
            ////////////////////////// Editar cantidad del producto /////////////////////////////////////
            button_plus_tag.addEventListener("click",add_item)
            button_minus_tag.addEventListener("click",substract_item)
            
            function add_item(){
        
                
                product_array[j].cantidad = Number(product_array[j].cantidad) + 1;
                ////////////////////// Actualizar local storage //////////////////////////////////////////
                
                window.localStorage.setItem(product_array[j].id,JSON.stringify(product_array[j]))
                //////////////////////////////////////////////////////////////////////////////////////////
                element_p_tag.textContent = product_array[j].nombre + ' x ' + product_array[j].cantidad;
                element_p_tag_2.textContent = 'Total: ' + product_array[j].cantidad * product_array[j].precio; 
                //////////////////////////////Precio total////////////////////////////////////////
                let precio_total = precio_total_tag()
                total_compra.innerText = String(precio_total)
            }
            
            function substract_item(){
                if(product_array[j].cantidad > 0){
                product_array[j].cantidad = Number(product_array[j].cantidad) - 1;
                ////////////////////// Actualizar local storage //////////////////////////////////////////
                
                window.localStorage.setItem(product_array[j].id,JSON.stringify(product_array[j]))
                //////////////////////////////////////////////////////////////////////////////////////////
                element_p_tag.textContent = product_array[j].nombre + ' x ' + product_array[j].cantidad;
                element_p_tag_2.textContent = 'Total: ' + product_array[j].cantidad * product_array[j].precio;
                let precio_total = precio_total_tag()
                total_compra.innerText = String(precio_total)
                }
                
            }

            
        }


        }