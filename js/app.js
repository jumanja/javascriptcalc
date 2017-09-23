//Uploading to githb 
//Patrón Módulo aplicato objeto calculadora
var Calculadora = (function(num1, num2){

  function actualizarResultado(nuevoResultado){
    this.resultado = nuevoResultado
  }

  return {
    sumar: function(){
      var resul = this.numero1 + this.numero2
      this.resultado = resul
    },
    restar: function(){
      var resul = this.numero1 - this.numero2
      this.resultado = resul
    },
    multiplicar: function(){
      var resul = this.numero1 * this.numero2
      this.resultado = resul
    },
    dividir: function(){
      var resul = this.numero1 / this.numero2
      this.resultado = resul
    },
    numero1: 0,
    numero2: 0,
    operacion: "",
    resultado: 0,
    resetear: function(){
      this.numero1 = 0
      this.numero2 = 0
      this.operacion = ""
    }

  }
});


function teclaArriba(event){
  var tecla = event.which || event.keyCode;
  var key = String.fromCharCode(tecla)
  liberada(key)
}

function teclaAbajo(event){
  var tecla = event.which || event.keyCode;
  var key = String.fromCharCode(tecla)
  pulsada(key)
}

function liberada(key){
  var id = key
  if(key === "punto"){
    key = ".";
  }
  if(key === "sign"){
    key = "s";
  }
  if(key === "on"){
    key = "o";
  }
  if("os.0123456789".indexOf(key) > -1 ) {
    document.getElementById(id).style = "";
  }
}

function pulsada(tecla) {
  var key = tecla
  var id = tecla

  if(key == "dividido"
    || key == "por"
    || key == "menos"
    || key == "mas"
    || key == "igual" ){
    operar(key)
    return
  }
  if(key == "on"){
    key = "o"
  }
  if(key == "sign"){
    key = "s"
  }
  if(key == "punto"){
    key = "."
  }

  if(key == "unknown" || "os.01234567890".indexOf(key) === -1){
      return
  }
  if("os456789".indexOf(key) > -1) {
    document.getElementById(id).style.width = "20%";
    document.getElementById(id).style.height = "60px";
  }
  if(".0123".indexOf(key) > -1) {
    document.getElementById(id).style.width = "27%";
    document.getElementById(id).style.height = "60px";
  }
  if(key == "o"){
    Calculadora.resetear
    setTimeout(function() { liberada(id) },100);
    return
  }

  if(document.getElementById("display").innerHTML === "0"
    && ".s".indexOf(key) == -1) {
    document.getElementById("display").innerHTML = key
  } else {
    if(document.getElementById("display").innerHTML.length <= 7){
      if(key === "." &&
         document.getElementById("display").innerHTML.indexOf(".") > -1){
        //no haga nada, ya tiene punto
      } else if (key === "s") {
          toogleMinus();
      } else {
        document.getElementById("display").innerHTML += key;
      }
    }
  }
  setTimeout(function() { liberada(id) },100);
}

function procesarTecla(event) {
  var tecla = event.which || event.keyCode;
  var key = String.fromCharCode(tecla)
  if(key == null) {
    key = "unknown"
  }
  pulsada(key)
}

function toogleMinus(){
  if(document.getElementById("display").innerHTML === "0"){
      //no haga nada, cero no puede ser negativo
  } else {
    if(document.getElementById("display").innerHTML.charAt(0) == "-"){
      document.getElementById("display").innerHTML = document.getElementById("display").innerHTML.substr(1)
    }  else {
      document.getElementById("display").innerHTML = "-" + document.getElementById("display").innerHTML
    }

  }

}

function operar(key) {

  if (Calculadora.operacion === "") {
    Calculadora.numero1 = Number(document.getElementById("display").innerHTML)
    Calculadora.operacion = key
    document.getElementById("display").innerHTML = "0"
  } else {
    Calculadora.numero2 = Number(document.getElementById("display").innerHTML)

    if(Calculadora.operacion === "mas"){
      Calculadora.sumar()
    } else if(Calculadora.operacion === "menos") {
      Calculadora.restar()
    } else if(Calculadora.operacion === "por") {
      Calculadora.multiplicar()
    } else if(Calculadora.operacion === "dividido") {
      Calculadora.dividir()
    }

    if(key === "igual"){
      document.getElementById("display").innerHTML = Calculadora.resultado
      Calculadora.numero1 = Calculadora.resultado
      Calculadora.numero2 = 0
      Calculadora.operacion = ""
    } else {
      document.getElementById("display").innerHTML = "0"
    }

  }
  console.log("num1: " + Calculadora.numero1,
              "ope: " + Calculadora.operacion,
              "num2: " + Calculadora.numero2,
              "res: " + Calculadora.resultado )

}
function init(){
  //Llevar a Cero  la Calculadora
  document.getElementById('on').addEventListener('click', function(){
    Calculadora.resetear
    document.getElementById('display').innerHTML = "0";
  })
  //Adicionar click a la tecla
  var teclas = document.getElementsByClassName('tecla')
  for( i = 0; i < teclas.length; i++){
    teclas[i].addEventListener('click', function(){
        pulsada(this.id)
    })
  }
  document.onkeydown=teclaAbajo
  document.onkeyup=teclaArriba

  Calculadora = new Calculadora()

}

init();
