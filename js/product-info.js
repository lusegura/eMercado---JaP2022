let producto=[];
let comment=[];

let ID= localStorage.getItem("ProductID");

let ProductInfoURL = PRODUCT_INFO_URL+`${ID}`+EXT_TYPE;
let ProductCommentsURL = PRODUCT_INFO_COMMENTS_URL+`${ID}`+EXT_TYPE;

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(ProductInfoURL).then(result=>{
        if (result.status==="ok"){
            producto = result.data;
            mostrarInfoProducto(producto)
            console.log(producto);
        } else{
            alert("error" + result.status);
        }
    })


function mostrarInfoProducto(id){
htmlContentToAppend="";
htmlContentToAppend += `
<div class="container" id="infoProducto">
<h3>`+ id.name +`</h3><hr>
<strong class="subtitulo">Precio:</strong>
<p>`+ id.currency +" "+ id.cost+ `</p>
<strong class="subtitulo">Descripción:</strong>
<p>`+ id.description +`<p>
<strong class="subtitulo">Categoría:</strong>
<p>`+ id.category +`<p>
<strong class="subtitulo">Cantidad de vendidos:</strong>
<p>`+ id.soldCount +`<p>
<strong class="subtitulo">Imágenes ilustrativas:</strong><br>
<div id="imgProducto">
<img src="` + id.images[0] + `" alt="product images" class="imagen-auto">
<img src="` + id.images[1] + `" alt="product images" class="imagen-auto">
<img src="` + id.images[2] + `" alt="product images" class="imagen-auto">
<img src="` + id.images[3] + `" alt="product images" class="imagen-auto"><br><br>

<strong class="subtitulo"> Comentarios:</strong><br><br>
</div>
</div>
`
document.getElementById("infoProducto").innerHTML= htmlContentToAppend
};

getJSONData(ProductCommentsURL).then(result=>{
    if (result.status==="ok"){
        comment = result.data;
        mostrarComentarios(comment)
        console.log(comment);
    } else{
        alert("error" + result.status);
    }
})

function mostrarComentarios(id){


    htmlContentToAppend=""
for(let i = 0; i < id.length; i++){ 
    let comentario = id[i];
   
    htmlContentToAppend += `
<div class="comentarioEstilo" id="comentarios">
<p><strong>`+ comentario.user +`</strong> - `+ comentario.dateTime +`</p> 
<p id="estrellas"> puntuacion (del 1 al 5): `+ comentario.score +`</p>
<p>`+ comentario.description +`</p>
<hr class="division">
</div>
`
  ;
console.log(typeof comentario.score);

document.getElementById("comentarios").innerHTML= htmlContentToAppend;

for(let i = 0; i < id.length; i++){ 
    let comentario = id[i];
valoracionEstrellas(comentario.score);
};

}
};
});

function valoracionEstrellas(score){
for (let i = 0; i < score; i++) {
     document.getElementById("estrellas").innerHTML+=`
    <span class="fa fa-star checked"></span>
    `
 };
};

document.getElementById("botonComentario").addEventListener("click",function(){
        document.getElementById("textoArea").value = "";
        document.getElementById("seleccionPuntos").value="";
});
