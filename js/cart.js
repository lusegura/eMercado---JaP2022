
let carrito = [];
let ID= 25801;

let CartInfoURL = CART_INFO_URL+`${ID}`+EXT_TYPE;



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
           
        } else{
            alert("error" + result.status);
        }
    });

function mostrarCarrito(carrito){
    let htmlContentToAppend = "";
    for(let i = 0; i < carrito.articles.length; i++){ 
        let articulo = carrito.articles[i];
       
            htmlContentToAppend += `
            <tbody id="carrito">
          <tr>
            <th scope="row"> <img src="${articulo.image}" alt="${articulo.name}" class="img-thumbnail imagen-carrito"></th>
            <td>${articulo.name}</td>
            <td>${articulo.currency}<input type="number" id="costo" value="${articulo.unitCost}" disabled></td>
            <td><input type="number" id="cantidad" value="${articulo.count}"></td>
            <th id="moneda">${articulo.currency}<th id="subtotal"></th></th>
          </tr>
        </tbody>
            `
    }

        document.getElementById("carrito").innerHTML = htmlContentToAppend;
        
    };

 function subtotal() {
    document.getElementById("subtotal").innerHTML= document.getElementById("cantidad").value * document.getElementById("costo").value; 
}


});


