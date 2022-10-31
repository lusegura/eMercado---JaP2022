let producto=[];
let comment=[];

let ID= localStorage.getItem("ProductID");
let ProductInfoURL = PRODUCT_INFO_URL+`${ID}`+EXT_TYPE;
let ProductCommentsURL = PRODUCT_INFO_COMMENTS_URL+`${ID}`+EXT_TYPE;


document.addEventListener("DOMContentLoaded", function(){
    getJSONData(ProductInfoURL).then(result=>{
        if (result.status==="ok"){
            producto = result.data;
            mostrarInfoProducto(producto);
            console.log(producto);
        } else{
            alert("error" + result.status);
        }
    })


function mostrarInfoProducto(id){
htmlContentToAppend="";
htmlContentToAppend += `
<div class="container" id="infoProducto">
<h3 class="nombreProducto"> ${id.name} </h3><hr>
<strong class="subtitulo">Precio:</strong>
<p> ${id.currency}  ${id.cost} </p>
<strong class="subtitulo">Descripción:</strong>
<p> ${id.description}<p>
<strong class="subtitulo">Categoría:</strong>
<p> ${id.category}<p>
<strong class="subtitulo">Cantidad de vendidos:</strong>
<p> ${id.soldCount}<p>
<strong class="subtitulo">Imágenes ilustrativas:</strong><br>

<div id="carouselExampleControls" class="carousel carousel-dark slide carusel" data-bs-ride="carousel">
                <div class="carousel-inner">
                      ${mostrarImagenes(id.images)}  
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
</div>

<strong class="subtitulo"> Productos relacionados:</strong><br><br>
</div>
<div class="container">
  <div class="row">
${otrosProductos(id.relatedProducts)} 
</div>
</div>
<strong class="subtitulo"> Comentarios:</strong><br><br
`
;

document.getElementById("infoProducto").innerHTML= htmlContentToAppend
};

function mostrarImagenes(id){
    imagenesToAppend = ""
    for (i = 0; i < id.length; i++){
        let imagen=id[i];
        imagenesToAppend +=` 
                <div class="carousel-item active ">
                    <img src="${imagen}" class="d-block w-100" alt="product images">
                </div>
               
`}
    return imagenesToAppend;
};

function otrosProductos(id){
    otrosToAppend=""
    for (i = 0; i < id.length; i++){
       let producto=id[i];
       otrosToAppend+=`       
       <div class="card tarjeta" class="col-sm" onclick="setRelatedID(${producto.id})"  style="width: 400px;">
         <img src= "${producto.image}"  alt="related-product-images" class="card-img-top" imagen-productoRelacionado">
         <div class="card-body">
          <p class="card-text"> ${producto.name} <p>
         </div>
       </div>
       `}
       return otrosToAppend;
   }; 
//ENTREGA 4 = MOSTRAR PRODUCTO RELACIONADO (FUNCION) LINEAS 78 AL 91 SE EJECUTA EN LINEA 55. 



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
<li class="list-group-item" id="comentarios">
<strong> ${comentario.user} </strong> - </small> ${comentario.dateTime}</small> 
<p id="estrellas"> puntuación:  ${valoracionEstrellas(comentario.score)} </p>
<p> ${comentario.description} </p>
</li>
`
document.getElementById("comentarios").innerHTML= htmlContentToAppend;

}
};
});


function valoracionEstrellas(score) {
    estrellasToAppend = ``
    for (i = 0; i < 5; i++){
        if (i < score) {
            estrellasToAppend += `
                <span class="fa fa-star checked"></span>`
        }else {
            estrellasToAppend += `<span class="fa fa-star"></span>`
        }}
    return estrellasToAppend;
};

document.getElementById("botonComentario").addEventListener("click",function(){
        document.getElementById("textoArea").value = "";
        document.getElementById("seleccionPuntos").value="";
});


function setRelatedID(ProductID) {
    localStorage.setItem("ProductID",ProductID);
    window.location= "product-info.html";
};
//"REDIRECCION" = REESCRIBE EL ID DE PRODUCTO PARA QUE SE CAMBIE EL VALOR DEL ID PARA PODER CARGAR 
//LOS DATOS DEL NUEVO PRODUCTO.LINEAS 143 AL 145 ENTREGA 4 
