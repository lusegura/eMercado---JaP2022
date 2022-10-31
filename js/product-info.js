let producto=[];
let comment=[];


let ID= localStorage.getItem("ProductID");
let ProductInfoURL = PRODUCT_INFO_URL+`${ID}`+EXT_TYPE;
let ProductCommentsURL = PRODUCT_INFO_COMMENTS_URL+`${ID}`+EXT_TYPE;

class Producto{
    constructor(imagen, nombre, moneda, precio){
        this._imagen = imagen,
        this._nombre = nombre,
        this._moneda = moneda,
        this._precio = precio
    }
};

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(ProductInfoURL).then(result=>{
        if (result.status==="ok"){
            producto = result.data;
            mostrarInfoProducto(producto);
            console.log(producto);
            document.getElementById("agregarCarrito").addEventListener("click",function(){
               /*  agregarACarrito();  ESTA FUNCION AGREGA AL LOCAL STORAGE SOLO LOS ID*/
                agregarACarrito1(); //ESTA FUNCION INTENTA AGREGAR AL LOCAL STORAGE EL OBJETO
               });
        } else{
            alert("error" + result.status);
        }
    })

    
    

function mostrarInfoProducto(id){
htmlContentToAppend="";
htmlContentToAppend += `

<div class="container" id="infoProducto"> 
<h3 class="nombreProducto"> ${id.name} </h3>
<button class="btn btn-success" type="submit" id="agregarCarrito">Comprar!</button><hr>
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
<strong class="subtitulo"> Comentarios:</strong><br><br>
`
;
let agregarProducto = new Producto(id.images[0], id.name, id.currency, id.cost) // OBJETO A AGREGAR
console.log(agregarProducto);// aca esta hecho el objeto y se visualiza en la consola

document.getElementById("infoProducto").innerHTML= htmlContentToAppend
}
;

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


/*  CARRITO SIN CONSIDERAR REPETICION DE PRODUCTO:

    let mis_items=[]
    let items= ID;
 function agregarACarrito(){
    if (localStorage.getItem("items")){
        alert("hay")
        items_json= localStorage.getItem("items"); // obtuve valor del localStorage (se llama items_json)
        mis_json= JSON.parse(items_json); // lo converti a string (pasa a llamarse mis_json)
        console.log(mis_json); 
        mis_json.push(items); //le agregue a lo que ya tenia (mis_json) el ID del nuevo producto 
        miCarrito = JSON.stringify(mis_json); // lo transformo en json de nuevo
        localStorage.setItem("items", miCarrito);// lo subo al localStorage
 }else{
    alert("no hay")
       mis_items.push(items); // al carrito(mis_items) vacio se le agrega el producto(items)
       let items_json = JSON.stringify(mis_items); // convertimos el carito a json (pasa a llamarse items_json)
       localStorage.setItem("items", items_json); //subimos al localstorage
 }
}; */


/* CARRITO CONSIDERANDO REPETICION DE PRODUCTO:

let mis_items=[]
let items= ID;
function agregarACarrito(){
if (localStorage.getItem("items")){
    alert("hay")
    items_json= localStorage.getItem("items"); // obtuve valor del localStorage (se llama items_json)
    mis_json= JSON.parse(items_json); // lo converti a string (pasa a llamarse mis_json)
    if(mis_json.indexOf(items) != -1){ // si se encuentra el elemento en el arreglo, no se modifica 
        alert("ya esta")
        miCarrito = JSON.stringify(mis_json); // lo transformo en json de nuevo
        localStorage.setItem("items", miCarrito);// lo subo al localStorage
    }else{ // si no se encuentra en el arreglo (el indexOf da -1, se agrega al arreglo el elemento)
    console.log(mis_json); 
    mis_json.push(items); //le agregue a lo que ya tenia (mis_json) el ID del nuevo producto 
    miCarrito = JSON.stringify(mis_json); // lo transformo en json de nuevo
    localStorage.setItem("items", miCarrito);// lo subo al localStorage
}}else{
alert("no hay")
   mis_items.push(items); // al carrito(mis_items) vacio se le agrega el producto(items)
   let items_json = JSON.stringify(mis_items); // convertimos el carito a json (pasa a llamarse items_json)
   localStorage.setItem("items", items_json); //subimos al localstorage
}
}; */




/* GUARDA ID EN LOCAL STORAGE EN VEZ DEL OBJETO

let mi_Carrito=[]
let agregar= ID;
function agregarACarrito(){
if (localStorage.getItem("Carrito")){
    alert("hay productos en carrito")
    agregar_json= localStorage.getItem("Carrito"); 
    a_agregar= JSON.parse(agregar_json); 
    if(a_agregar.indexOf(agregar) != -1){ 
        alert("ya esta")
        miCarrito = JSON.stringify(a_agregar); 
        localStorage.setItem("Carrito", miCarrito);
    }else{ 
    console.log(a_agregar); 
    a_agregar.push(agregar); 
    miCarrito = JSON.stringify(a_agregar); 
    localStorage.setItem("Carrito", miCarrito);
}}else{
alert("no hay productos en carrito")
mi_Carrito.push(agregar); 
   let agregar_json = JSON.stringify(mi_Carrito); 
   localStorage.setItem("Carrito", agregar_json); 
}
}; */

//INTENTO DE GUARDAR EL OBJETO agregarProducto EN EL LOCAL STORAGE:
let mi_Carrito=[]
function agregarACarrito1(){
    if (localStorage.getItem("Carrito")){
        alert("hay productos en carrito")
        agregar_json= localStorage.getItem("Carrito"); 
        a_agregar= JSON.parse(agregar_json); 
        if(a_agregar.indexOf(agregarProducto) != -1){ 
            alert("ya esta")
            mi_Carrito = JSON.stringify(a_agregar); 
            localStorage.setItem("Carrito", mi_Carrito);
        }else{ 
        console.log(a_agregar); 
        a_agregar.push(agregarProducto); 
        mi_Carrito = JSON.stringify(a_agregar); 
        localStorage.setItem("Carrito", mi_Carrito);
    }}else{
    alert("no hay productos en carrito")
    mi_Carrito.push(agregarProducto); 
       let agregar_json = JSON.stringify(mi_Carrito); 
       localStorage.setItem("Carrito", agregar_json); 
    }
    };
    