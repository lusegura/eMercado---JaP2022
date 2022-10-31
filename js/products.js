let listadoAutos=[];
let min= undefined;
let max= undefined;

/* sin los filtros, mostrar el array: function mostrarAutos(array){
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
}} */


console.log(typeof PRODUCTS_URL);

let ID= localStorage.getItem("catID");
console.log(typeof "catID");
let ProductURL = PRODUCTS_URL+`${ID}`+EXT_TYPE;

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(ProductURL).then(result=>{
        if (result.status==="ok"){
            listadoAutos = result.data.products;
            //funcion mostrar autos (listadoAutos) el parametro es un array
            mostrarAutos(listadoAutos)
            console.log(listadoAutos);
        } else{
            alert("error" + result.status);
        }
    })
    
function mostrarAutos(array){
       let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){ 
        let products = array[i];
        if ((min == undefined && max == undefined)||(products.cost >= min && products.cost <= max)||
        (products.cost >= min && max == undefined)||(products.cost <= max && min == undefined)){
            htmlContentToAppend += `
    <div class="container" id="autos">
    <div onclick="setProductID(${products.id})" class="list-group-item list-group-item-action cursor-active">
     <img src="` + products.image + `" alt="product image" class="imagen-auto">
     <div class=infoAutos>
      <h4>` + products.name + `</h4>
      <h4>`+ products.currency +" "+ products.cost+ `</h4>
      <p>`+ products.description +`</p>
      <small >`+ products.soldCount +`</small>
      </div>
      </div>
    </div>
    `
    document.getElementById("autos").innerHTML= htmlContentToAppend
}}  
    }
   
document.getElementById("ordenAscendente").addEventListener("click",function(){
        listadoAutos.sort(function(a,b){
        return parseInt(a.cost) - parseInt(b.cost);
    })
    mostrarAutos(listadoAutos);
});

document.getElementById("ordenDescendente").addEventListener("click",function(){
    listadoAutos.sort(function(a,b){
    return parseInt(b.cost) - parseInt(a.cost);
})
mostrarAutos(listadoAutos);
})

document.getElementById("relevancia").addEventListener("click",function(){
    listadoAutos.sort(function(a,b){
    return (b.soldCount) - (a.soldCount);
})
mostrarAutos(listadoAutos);
});

document.getElementById("filtro").addEventListener("click", function(){
   if (document.getElementById("min").value !=""){
    min = parseInt(document.getElementById("min").value);
}else{
    min = undefined;
}

if (document.getElementById("max").value !=""){
    max = parseInt(document.getElementById("max").value);
}else{
    max= undefined;
} //para evitar el Not A Number (decimos que si min es diferente a ningun valor es porque le escribimos un valor sino es undefined lo mismo para max)
    mostrarAutos(listadoAutos);
});

document.getElementById("limpiar").addEventListener("click",function(){
min= undefined;
max= undefined;
document.getElementById("min").value = "";
document.getElementById("max").value = "";
mostrarAutos(listadoAutos);
});

});

function setProductID(id) {
    localStorage.setItem("ProductID", id);
    window.location = "product-info.html"
}
 document.getElementById("autos").addEventListener("click",function(){
    localStorage.getItem("ProductID",ProductID);
    setProductID();
}); 
/* SE AGREGO LAS LINEAS 50js Y DE LA LINEA 111 A LA 119 PARA LA CONSIGNA 1 DE LA ENTREGA 3 */