var idCounter = 0; // Variable global para llevar el conteo de IDs 
   
//BUCLE QUE ITERA POR TODOS LOS ELEMENTO H2 Y P PARA DARLE EL ATRIBUTO DE EDITOR DE CONTENIDO
function addContentEditable() {
    // Selecciona todos los elementos h2 y p dentro de la lista de tareas
    var elementsInsideDiv = document.querySelectorAll('#list-of-tasks h2, #list-of-tasks p');

    elementsInsideDiv.forEach(function(element) {
        element.setAttribute('contentEditable', 'false');
    });
}


//FUNCION PARA EDITAR CONTENIDO
function toggleEditing(span) {
    var container = span.parentElement.previousElementSibling;
    var titleElement = container.querySelector('#title-task');
    var descriptionElement = container.querySelector('#description-task');

    titleElement.contentEditable = (titleElement.contentEditable === 'false').toString();
    descriptionElement.contentEditable = (descriptionElement.contentEditable === 'false').toString();

    if (titleElement.contentEditable === 'true') {
        titleElement.focus();
    } else if (descriptionElement.contentEditable === 'true') {
        descriptionElement.focus();
    }
    updateLocalStorage();//observa como va esto
}
   

   

//FUNCION DE CIERRE OPERATIVA Y MAS FUNCIONAL
function eliminateElement() {
var listOfTasks = document.getElementById("list-of-tasks");

    // Asignar el evento a la lista contenedora y utilizar delegación de eventos
    listOfTasks.addEventListener('click', function(event) {
        var target = event.target;

        // Verificar si el clic se hizo en un botón de clase 'close'
        if (target.classList.contains('close')) {
            var liToRemove = target.closest('li');

            // Verificar si el elemento tiene un nodo padre antes de intentar eliminarlo
            if (liToRemove && liToRemove.parentNode) {
                liToRemove.parentNode.removeChild(liToRemove);
                
                // Eliminar el elemento de la memoria
                var taskElement = target.closest('.li-container');
                if (taskElement) {
                    taskElement.remove();
                }

                 // Eliminar el estado de la tarea del localStorage
                var taskId = liToRemove.id; // Asume que el ID del elemento es único
                localStorage.removeItem('markedState_' + taskId);
                // Actualizar el LocalStorage después de eliminar
                updateLocalStorage();
            }
        }
    });
}


//Funcion para actualizar el contenido de la memoria y el array
function updateLocalStorage() {
    var tasks = Array.from(document.querySelectorAll('.li-container')).map(function(taskElement) {
        var title = taskElement.querySelector('h2').textContent;
        var description = taskElement.querySelector('p').textContent;
        return createTaskObject(title, description);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
    
// Función para crear un nuevo objeto de tarea
function createTaskObject(title, description) {
    return {
        title: title,
        description: description
    };
}

// Función para crear un nuevo elemento de tarea en el DOM
function createTaskElement(taskData) {
    var li = document.createElement("li");
    li.className = "li-container";

    // Asignar un ID único basado en el contador
    var taskId = generateUniqueId();
    li.id = 'task_' + taskId;

    var img = document.createElement("img");
    img.className = "my-check-img";
    img.src = "img/check.png";
    img.style.display = "none";
    li.appendChild(img);

    var div = document.createElement("div");
    var h2 = document.createElement("h2");
    var pDescription = document.createElement("p");

    h2.id = "title-task";
    pDescription.id = "description-task";

    var divEspan = document.createElement("div");
    divEspan.className = "div-container-edit";

    var edit = document.createElement("SPAN");
    var edittxt = document.createTextNode("\u270F");

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    h2.textContent = taskData.title;
    pDescription.textContent = taskData.description;

    div.appendChild(h2);
    div.appendChild(pDescription);
    div.id = "div-container";
    div.addEventListener('click', function() {
        checkElements(div);
    });

    edit.className = "edit";
    edit.id = "event-edit";
    edit.appendChild(edittxt);

    span.className = "close";
    span.appendChild(txt);

    li.appendChild(div);
    li.appendChild(divEspan);
    divEspan.appendChild(edit);
    divEspan.appendChild(span);

    return li;
    
}

// Función para guardar los datos en el LocalStorage
function saveTaskToLocalStorage(taskData) {
var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.push(taskData);
localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función principal para agregar una tarea
function addTask() {

var title = document.getElementById("title-task-input").value;
var description = document.getElementById("description-task-input").value;

if(title === "" || description === ""){
    alert("Ambos campos deben estar rellenos");
    return;
} //control point to avoid empty

var taskData = createTaskObject(title, description);
saveTaskToLocalStorage(taskData);

var newTaskElement = createTaskElement(taskData);

var listOfTasks = document.getElementById("list-of-tasks");
listOfTasks.appendChild(newTaskElement);

window.location.reload(true);//experimental,  funciona OJO
}

//funcion para limpiar los imputs
function clearImput() {
// obtén el elemento de entrada por su ID
var inputElement1 = document.getElementById("title-task-input");
var inputElement2 = document.getElementById("description-task-input");
// limpia el valor del campo de entrada asignándole una cadena vacía
inputElement1.value = "";
inputElement2.value = "";
}

//funcion qu se encarga de egenerar un contado como id unico
function generateUniqueId() {
// Incrementa el contador y devuelve el nuevo valor
return idCounter++;
}

//funcion que le hace check a los elementos
function checkElements(element) {
// Verifica si el elemento está siendo editado
if (element.querySelector('#title-task').contentEditable === 'true' ||
   element.querySelector('#description-task').contentEditable === 'true') {
   return; // No realices ninguna acción si el elemento está siendo editado
}

// Obtiene el elemento li padre
var liElement = element.closest('li');

// Alterna la clase 'marked' en el elemento li
liElement.classList.toggle('marked');

var image = liElement.querySelector('.my-check-img');
if (image.style.display === 'none') {
   image.style.display = 'block'; // Muestra la imagen si estaba oculta
} else {
   image.style.display = 'none'; // Oculta la imagen si estaba visible
}

// Guarda el estado 'marked' en localStorage
var taskId = liElement.id; // Asume que el ID del elemento li es único
var markedState = liElement.classList.contains('marked');
localStorage.setItem('markedState_' + taskId, markedState);
}

//funcion para restaurar los checks ya realizados
function restoreMarkedState() {
var listOfTasks = document.getElementById("list-of-tasks").children;

for (var i = 0; i < listOfTasks.length; i++) {
  var taskId = listOfTasks[i].id;
  var markedState = JSON.parse(localStorage.getItem('markedState_' + taskId)); // Convertir a booleano

  console.log('Task ID:', taskId, 'Marked State:', markedState);

  if (markedState) {
      // Aplicar la clase 'marked' y visualización del icono
      listOfTasks[i].classList.add('marked');
      listOfTasks[i].querySelector('.my-check-img').style.display = 'block'; // Cambio aquí
  }
}
}

// Función para obtener las tareas almacenadas en el LocalStorage
function getTasksFromLocalStorage() {
return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Función para cargar las tareas almacenadas en el LocalStorage y mostrarlas en el DOM
function loadTasks() {
var tasks = getTasksFromLocalStorage();
var listOfTasks = document.getElementById("list-of-tasks");

tasks.forEach(function(taskData) {
    var taskElement = createTaskElement(taskData);
    listOfTasks.appendChild(taskElement);
});

addContentEditable(); 
}


// FUNCION PARA COLOCAR EN LAS SPAN LA FUNCION DE TOGGLE EDITION
// Obtén todos los elementos con la clase div-container-edit
function addeventOnclick() {
var listOfTasks = document.getElementById("list-of-tasks");

// Utiliza delegación de eventos para asignar el evento 'click' a la lista contenedora
listOfTasks.addEventListener('click', function(event) {
    var target = event.target;

    // Verifica si el clic se hizo en un elemento con la clase 'edit' y el id 'event-edit'
    if (target.classList.contains('edit') && target.id === 'event-edit') {
        toggleEditing(target);
    }
});
}

// Llamada a la función loadTasks al cargar la página para mostrar las tareas existentes
window.onload = function() {
loadTasks();
addeventOnclick();
restoreMarkedState();
};

// Llama a esta función después de cargar la pagina
eliminateElement(); 
