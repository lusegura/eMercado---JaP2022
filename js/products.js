function mostrarAutos(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        htmlContentToAppend += `
    <div class="container" id="autos">
     <img src="` + products.image + `" alt="product image" class="imagen-auto">
     <div class=infoAutos>
      <h4>` + products.name + `</h4>
      <h4>`+ "USD " + products.cost+ `</h4>
      <p>`+ products.description +`</p>
      <small >`+ products.soldCount +`</small>
      </div>
    </div>
    `
    document.getElementById("autos").innerHTML= htmlContentToAppend
}}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCTS_URL).then(result=>{
        if (result.status==="ok"){
            let listadoAutos = result.data.products;
            //funcion mostrar autos (listadoAutos) el parametro es un array
            mostrarAutos(listadoAutos)
            console.log(listadoAutos);
        } else{
            alert("error" + result.status);
        }
    })
})