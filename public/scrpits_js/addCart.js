window.addEventListener("load", loader);

function loader() {
  ////Loads all products into product_array
  let product_array = [];
  for (let i = 0; i < 10; i++) {
    let storage = JSON.parse(localStorage.getItem(i));
    if (storage != null) {
      product_array.push(storage);
    }
  }

  const total_compra = document.getElementById("total_compra");

  ///////////Elements for Create Table//////////////////////////////
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const th3 = document.createElement("th");
  const th4 = document.createElement("th");
  const th5 = document.createElement("th");
  const tbody = document.createElement("tbody");

  ////////////Table/////////////////////////////
  table.className = "pure-table pure-table-horizontal";

  ////////////////////////////////////////////////////////////
  document.getElementsByClassName("table_builder")[0].appendChild(table);

  table.appendChild(thead);
  //Table Headers
  thead.appendChild(th1).innerText = "nombre";
  thead.appendChild(th2).innerText = "precio unidad";
  thead.appendChild(th3).innerText = "cantidad";
  thead.appendChild(th4).innerText = "agregar/quitar";
  thead.appendChild(th5).innerText = "Eliminar";
  //Table Body
  table.appendChild(tbody);
  let precio_final = 0;
  for (let j = 0; j < product_array.length; j++) {
    ////Create Elements
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const td5 = document.createElement("td");
    //Button Delete
    const button_delete = document.createElement("button");
    button_delete.className = "button-error pure-button";
    //Plus/minus Buttons
    const button_plus = document.createElement("button");
    button_plus.className = "button-success pure-button";
    const button_minus = document.createElement("button");
    button_minus.className = "button-secondary pure-button";
    ///Asign elements
    tbody.appendChild(tr);
    tr.appendChild(td1).innerText = String(product_array[j].nombre);
    tr.appendChild(td2).innerText = String(product_array[j].precio);
    tr.appendChild(td3).innerText = String(product_array[j].cantidad);

    tr.appendChild(td4).appendChild(button_plus).innerText = "+";
    button_plus.addEventListener("click", add_item);
    td4.appendChild(button_minus).innerText = "-";
    button_minus.addEventListener("click", substract_item);

    tr.appendChild(td5).appendChild(button_delete).innerText = "eliminar";
    button_delete.addEventListener("click", delete_item);

    //Utilities

    function add_item() {
      product_array[j].cantidad = Number(product_array[j].cantidad) + 1;
      //Update Local Storage
      window.localStorage.setItem(
        product_array[j].id,
        JSON.stringify(product_array[j])
      );
      //Update 'cantidad'
      td3.innerText = String(product_array[j].cantidad);
      total_compra.innerText = "Total: " + String(precio_total_tag());
    }
    function substract_item() {
      if (Number(product_array[j].cantidad) >= 1) {
        product_array[j].cantidad = Number(product_array[j].cantidad) - 1;
        //Update Local Storage
        window.localStorage.setItem(
          product_array[j].id,
          JSON.stringify(product_array[j])
        );
        //Update 'cantidad'
        td3.innerText = String(product_array[j].cantidad);
        total_compra.innerText = "Total: " + String(precio_total_tag());
      }
    }
    function delete_item() {
      localStorage.removeItem(product_array[j].id);
      location.reload();
    }
  }
  //Performs total price calculation each time is called
  function precio_total_tag() {
    let precio_total = 0;
    for (let k = 0; k < product_array.length; k++) {
      precio_total =
        precio_total +
        Number(product_array[k].cantidad) * Number(product_array[k].precio);
    }
    return precio_total;
  }
  //Final Price Tag:
  total_compra.innerText = "Total: " + String(precio_total_tag());
}
