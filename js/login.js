let boton= document.getElementById("login");
let email= document.getElementById("email");
let password= document.getElementById("password");



boton.addEventListener("click",function(){
    if(email.value.length>0 && password.value.length>0){
      window.location.href= "./portada.html";
      console.log(window.location.href)
    }else{
      alert("debe colocar su e-mail y su contraseña");
    }
});

