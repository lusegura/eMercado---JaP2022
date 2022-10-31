let boton= document.getElementById("login");
let email= document.getElementById("email");
let password= document.getElementById("password");



boton.addEventListener("click",function(){
    if(email.value.length>0 && password.value.length>0){
      window.location.href= "./portada.html";
      console.log(window.location.href)
      localStorage.setItem("login", JSON.stringify(email.value)); //se uso JSON.stringify (convierte objeto en string)porque localStorage acepta solo cadena de texto como parametro
    }else{
      alert("debe colocar su e-mail y su contraseña");
    }
});

