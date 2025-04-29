// Lista de tareas, cada tarea es un objeto con texto, prioridad, fechas y completado
let tareas = [];

// Estado actual de pestaña: 'sinCompletar' o 'completada'
let estadoActual = 'sinCompletar';

// Función para renderizar las tareas en sus listas
function renderizarTareas() {
  const listaSinCompletar = document.getElementById('todo-list-sinCompletar');
  const listaCompletada = document.getElementById('todo-list-completada');

  listaSinCompletar.innerHTML = '';
  listaCompletada.innerHTML = '';

  tareas.forEach((tarea, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (tarea.completada ? ' completada' : '');
    li.setAttribute('data-prioridad', tarea.prioridad);
    li.setAttribute('data-fechaModificacion', tarea.fechaModificacion);

    // Checkbox
    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox' + (tarea.completada ? ' checked' : '');
    checkbox.onclick = (e) => {
      e.stopPropagation(); // evitar toggle tachado al hacer click en checkbox
      tarea.completada = !tarea.completada;
      tarea.fechaModificacion = new Date().toISOString();
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
    cerrar.textContent = '\u00D7';
    cerrar.onclick = (e) => {
      e.stopPropagation();
      tareas.splice(idx, 1);
      renderizarTareas();
    };
    li.appendChild(cerrar);

    // Doble clic para editar tarea
    li.ondblclick = () => {
      const nuevoTexto = prompt('Editar tarea:', tarea.texto);
      if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
        tarea.texto = nuevoTexto.trim();
        tarea.fechaModificacion = new Date().toISOString();
        renderizarTareas();
      }
    };

    // Añadir a la lista correcta
    if (tarea.completada) {
      listaCompletada.appendChild(li);
    } else {
      listaSinCompletar.appendChild(li);
    }
  });
}

// Cambiar pestaña
function mostrarTab(tab) {
  estadoActual = tab;
  document.getElementById('todo-list-sinCompletar').style.display = tab === 'sinCompletar' ? '' : 'none';
  document.getElementById('todo-list-completada').style.display = tab === 'completada' ? '' : 'none';
  document.getElementById('tab-sinCompletar').classList.toggle('active', tab === 'sinCompletar');
  document.getElementById('tab-completada').classList.toggle('active', tab === 'completada');
}

// Añadir nueva tarea
function nuevoItem() {
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

  const ahora = new Date().toISOString();

  tareas.push({
    texto: texto,
    prioridad: parseInt(prioridad),
    fechaCreacion: ahora,
    fechaModificacion: ahora,
    completada: false
  });

  // Limpiar inputs
  input.value = '';
  prioridadSelect.value = '';

  renderizarTareas();
  mostrarTab('sinCompletar');
}

// Ordenar lista
function ordenarLista(criterio) {
  if (criterio === 'prioridad') {
    tareas.sort((a, b) => a.prioridad - b.prioridad);
  } else if (criterio === 'fechaModificacion') {
    tareas.sort((a, b) => new Date(a.fechaModificacion) - new Date(b.fechaModificacion));
  }
  renderizarTareas();
}

// Inicializar
mostrarTab('sinCompletar');
renderizarTareas();
