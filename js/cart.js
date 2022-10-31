
let carrito = [];
let ID= 25801;
let CartInfoURL = CART_INFO_URL+`${ID}`+EXT_TYPE;

//CARGA DE PAGINA:

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CartInfoURL).then(result=>{
        if (result.status==="ok"){
            carrito = result.data
            
            mostrarCarrito(carrito);
            console.log(carrito);
            console.log(typeof carrito.articles[0].name)
            console.log(typeof carrito.articles)
            subtotal();
            document.getElementById("cantidad").addEventListener("input", subtotal);
            document.getElementById("opcionEnvio").addEventListener("click", costoEnvioCostos)
            subtotalCostos()
            document.getElementById("cantidad").addEventListener("input", subtotalCostos); //al cambiar el valor aparece como undefined en la consola del navegador
            document.getElementById("cantidad").addEventListener("input", costoEnvioCostos)
            document.getElementById("formaPago").addEventListener("click", modoPago)
        } else{
            alert("error" + result.status);
        }
    });


//FUNCION QUE MUESTRA PRODUCTO PRECARGADO EN CARRITO:

function mostrarCarrito(carrito){
    let htmlContentToAppend = "";
    for(let i = 0; i < carrito.articles.length; i++){ 
        let articulo = carrito.articles[i];
       
            htmlContentToAppend += `
            <tbody id="carrito">
          <tr>
            <th scope="row"> <img src="${articulo.image}" alt="${articulo.name}" class="img-thumbnail imagen-carrito"></th>
            <td>${articulo.name}</td>
            <td>${articulo.currency}<input type="number" id="costo" class="inputcosto" value="${articulo.unitCost}" disabled></td>
            <td><input class="form-control" type="number" id="cantidad" name="cant" value="${articulo.count}"></td>
            <th id="moneda">${articulo.currency}<th ><input type="number" id="subtotal" class="inputcosto" value="" disabled></input></th></th>
          </tr>
        </tbody>
            `
    }

        document.getElementById("carrito").innerHTML = htmlContentToAppend;
        document.getElementById("seleccionPago").innerHTML=`<p>No ha seleccionado</p>`
    };

//SUBTOTAL DE TABLA:

 function subtotal() {
    document.getElementById("subtotal").value= document.getElementById("cantidad").value * document.getElementById("costo").value;
}


//SUBTOTAL DE LOS COSTOS:

function subtotalCostos(){ 
document.getElementById("Subtotal1").innerHTML=` USD  ${document.getElementById("cantidad").value * document.getElementById("costo").value}`
};

//PORCENTAJE ENVIO Y TOTAL DE LOS COSTOS:

function costoEnvioCostos(){
        var radios = document.getElementsByName("envio");
        for (let radio of radios)
        {
            if (radio.checked) {
                let porcentaje = radio.value;
                
                document.getElementById("Subtotal2").innerHTML=`USD ${porcentaje * (document.getElementById("cantidad").value * document.getElementById("costo").value)/100}`;//subtotalCosto en lugar de costo
                document.getElementById("Subtotal3").innerHTML=`USD ${porcentaje * (document.getElementById("cantidad").value * document.getElementById("costo").value)/100 + document.getElementById("cantidad").value * document.getElementById("costo").value}`;
              }
        }
};


// FUNCION DE MODO DE PAGO:

function modoPago(){
    var radioss1 = document.getElementsByName("pago");
    for (let radio of radioss1) {
        if (radio.checked) {
           let MetodoPago =radio.value;
           if(MetodoPago === "Transferencia"){
            cred1.disabled = true;
            cred2.disabled = true;
            cred3.disabled = true;
            cred1.value = " ";
            cred2.value = " ";
            cred3.value = " ";
            trans.disabled = false;
            document.getElementById("seleccionPago").innerHTML=`<p>Transferencia bancaria</p>`
           }else{
            trans.disabled = true; 
            trans.value = " ";
            cred1.disabled = false;
            cred2.disabled = false;
            cred3.disabled = false;
            document.getElementById("seleccionPago").innerHTML=`<p>Tarjeta de Crédito</p>`
           }

        }
    }
};

});

// VALIDACIONES:

let form1 = document.getElementById("form1");
let calle1 = document.getElementById("validationCalle");
let numero1 = document.getElementById("validationNumero");
let esquina1 = document.getElementById("validationEsquina");
let cantidadArt = document.getElementById("cantidad");
let formaDePago = document.getElementById("seleccionPago");


// CARGA Y EJECUCION DE VALIDACIONES:
document.addEventListener("DOMContentLoaded", function () {
  mostrarValidacion();
  form1.addEventListener("submit", validacionTotal);
 
}); 

//modificar class en tiempo real: 

function mostrarValidacion(){
  for (const input of form1) {
    input.addEventListener("change", (event) => {
      if (input.value !== "") {  
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
      }else{
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
      };   
    });
  }
 }


//validacion de todo:

function validacionTotal(evento){
   if(validarFormulario(evento) && validarFormulario1(evento) && validarFormulario2(evento) && validarFormulario3(evento) && validarFormulario4(evento)){
        this.submit();  
        alert("Su compra fue realizada de forma exitosa") 
}else{
  alert("Llene todos los datos para realizar su compra de forma exitosa")
}};

//validacion input cantidad:

function validarFormulario2(evento) { 
    evento.preventDefault();
    let cant = document.getElementById("cantidad")
     if(cant.value > 0){   
      cant.classList.add("is-valid"); 
        return true
     }else{
      cant.classList.add("is-invalid"); 
        alert("input cantidad debera ser al menos 1")
        return false
}}

//validacion radiobutton, tipo de envio:

    function validarFormulario1(evento) { 
      evento.preventDefault();
       if(form1.envio[0].checked == true){      
        return true
       }else if(form1.envio[1].checked == true){
        return true
      }else if(form1.envio[2].checked == true){
          return true
        }else{
          alert("debe seleccionar una forma de envio")
        return false
       }}

// validacion datos direccion de envio:

function validarFormulario(evento) { 
    evento.preventDefault();
    let calle = document.getElementById("validationCalle").value;
    if(calle.length == 0) {
      calle1.classList.add("is-invalid"); 
    }else{
        calle1.classList.remove("is-invalid");
        calle1.classList.add("is-valid");
    }
    let numero = document.getElementById("validationNumero").value;
    if (numero.length  == 0) {
        numero1.classList.add("is-invalid");
    }else{
      numero1.classList.remove("is-invalid");
      numero1.classList.add("is-valid");
    }
    let esquina = document.getElementById("validationEsquina").value;
    if(esquina.length == 0) {
        esquina1.classList.add("is-invalid");
     }else{
      esquina1.classList.remove("is-invalid");
      esquina1.classList.add("is-valid");
     }   
return true
}

//validacion seleccion forma de pago:

function validarFormulario3(evento){
   if (document.getElementById("validationFormCheck1").checked){
          return true;
        }else if (document.getElementById("validationFormCheck2").checked){
          return true;
          }else{
    alert("Debe elegir un metodo de pago")
    return false;
   }
}

//validacion Campos de forma de pago:

function validarFormulario4(evento){
  if (document.getElementById("validationFormCheck1").checked){
    if( document.getElementById("cred1").value !== "" && document.getElementById("cred2").value !== "" && document.getElementById("cred3").value !== ""){  
    return true;
  }else{
     alert("Debe completar todos los datos de la tarjeta")
     return false;
  }
}else if(document.getElementById("validationFormCheck2").checked){ 
    if(document.getElementById("trans").value !==""){     
    return true;
   }else{
    alert("Debe completar los datos de la cuenta bancaria"); 
   }}else{
    alert("Debe completar los datos de pago")
    return false;
   }
}

