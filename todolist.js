// Lista de tareas,array de cada tarea, es un objeto con texto, prioridad, fechas y completado
let tareas = [];

// Estado actual de pestaña: 'sinCompletar' o 'completada'
let estadoActual = 'sinCompletar';

// Función para actualizo interfaz muestro tareas con sus listas
function renderizarTareas() {
  const listaSinCompletar = document.getElementById('todo-list-sinCompletar');
  const listaCompletada = document.getElementById('todo-list-completada');

  // Elimina las listas antes creadas
  listaSinCompletar.innerHTML = '';
  listaCompletada.innerHTML = '';

  // Crea tarea
  tareas.forEach((tarea, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (tarea.completada ? ' checked' : ''); // '?' es un condicional
    li.setAttribute('data-prioridad', tarea.prioridad);
    li.setAttribute('data-fechaModificacion', tarea.fechaModificacion);

    // Checkbox
    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox' + (tarea.completada ? ' checked' : ''); // nuevamente '?', un condicional
    checkbox.onclick = (e) => { 
      e.stopPropagation(); // evita que click afecte otros eventos padres (como el doble click)
      tarea.completada = !tarea.completada;
      tarea.fechaModificacion = new Date().toISOString(); //actualiza la fecha de modificion
      renderizarTareas();
    };
    li.appendChild(checkbox);

    // Texto
    const texto = document.createElement('div');
    texto.className = 'todo-text';
    texto.textContent = tarea.texto + ' (Prioridad: ' + tarea.prioridad + ')';
    li.appendChild(texto);

    // Botón cerrar
    const cerrar = document.createElement('span');
    cerrar.className = 'cerrar';
    cerrar.textContent = '\u00D7'; // 'x'
    cerrar.onclick = (e) => {
      e.stopPropagation();
      tareas.splice(idx, 1); // elimina tarea del array
      renderizarTareas();
    };
    li.appendChild(cerrar);

    // Doble clic para editar tarea
    li.ondblclick = () => {
      const nuevoTexto = prompt('Editar tarea:', tarea.texto); // abre dialogo para modificar
      if (nuevoTexto !== null && nuevoTexto.trim() !== '') { // si no cancela y escribe algo
        tarea.texto = nuevoTexto.trim();
        tarea.fechaModificacion = new Date().toISOString();
        renderizarTareas();
      }
    };

    // Añadir a lista correcta
    if (tarea.completada) {
      listaCompletada.appendChild(li);
    } else {
      listaSinCompletar.appendChild(li);
    }
  });
}

// Cambiar pestaña
function mostrarTab(tab) {
  estadoActual = tab; // guarda donde estoy ahora
  // si estoy en pestana sin completar, se muestra esta, y lista de completadas se oculta
  document.getElementById('todo-list-sinCompletar').style.display = tab === 'sinCompletar' ? '' : 'none';
  document.getElementById('todo-list-completada').style.display = tab === 'completada' ? '' : 'none';
  // anado con active o quito css
  document.getElementById('tab-sinCompletar').classList.toggle('active', tab === 'sinCompletar');
  document.getElementById('tab-completada').classList.toggle('active', tab === 'completada');
}

// Añadir nueva tarea
function nuevoItem() {
  //obtengo la info que ingreso el usuario
  const input = document.getElementById('toDo-input');
  const prioridadSelect = document.getElementById('prioridad-input');
  const texto = input.value.trim();
  const prioridad = prioridadSelect.value;

  if (!texto) {
    alert('Por favor ingresa una tarea.');
    return;
  }
  if (!prioridad) {
    alert('Por favor selecciona una prioridad.');
    return;
  }

  // creo objeto de fecha y hora actual, y lo convierto en una cadena de texto
  const ahora = new Date().toISOString(); 

  tareas.push({
    texto: texto,
    prioridad: parseInt(prioridad),
    fechaCreacion: ahora,
    fechaModificacion: ahora,
    completada: false
  });

  // Limpio campos de formulario para prox tarea
  input.value = '';
  prioridadSelect.value = '';

  renderizarTareas();
  mostrarTab('sinCompletar');
}

// Ordenar lista
function ordenarLista(criterio) {
  if (criterio === 'prioridad') {
    tareas.sort((a, b) => a.prioridad - b.prioridad); // de menor a mayor
  } else if (criterio === 'fechaModificacion') {
    tareas.sort((a, b) => new Date(a.fechaModificacion) - new Date(b.fechaModificacion)); // de antigua a mas reciente
  }
  renderizarTareas();
}

// Inicio pagina
mostrarTab('sinCompletar');
renderizarTareas();
