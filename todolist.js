/*Creo boton para eliminar en cada lista*/
var lista = document.getElementsByTagName("li"); /*devuelve coleccion de elemtnos li del documento*/
for (let i = 0; i < lista.length; i++) { /*se crea span y nodo de texto x y se le agrega a span cerrar, ambos al final de cada li*/
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "cerrar";
  span.appendChild(txt);
  lista[i].appendChild(span);
}

// apretar cerrar boton para ocultar un item de la lista
var cerrarIniciales = document.getElementsByClassName("cerrar");
for (let i = 0; i < cerrarIniciales.length; i++) {
  cerrarIniciales[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

//anadir "un tick" cuando apreto en el item
var listo = document.querySelector('ul');
listo.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('tachado');
  }
}, false);

// creo un item nuevo cuando aprieto el boton de agregar
function nuevoItem() {
  var li = document.createElement("li");
  var inputValor = document.getElementById("toDo-input").value;
  var prioridadValor = document.getElementById("prioridad-input").value;
  var t = document.createTextNode(inputValor+ " (" + prioridadValor + ")");
  li.appendChild(t);
  if (inputValor === '') {
    alert("Ingresar alguna tarea por hacer!");
  } else {
    document.getElementById("toDo-ul").appendChild(li);
  }
  document.getElementById("toDo-input").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "cerrar";
  span.appendChild(txt);
  li.appendChild(span);

  // Adjuntar el event listener al botón "cerrar" recién creado
  span.onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

function modificarItem(){

}

function listarPrioridades(){

}
