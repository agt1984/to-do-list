  //esto tiene como obejto que, al iniciarse el programa, a todo los LI se le agreguen los span de elminar y editar
  var myNodelist = document.getElementsByTagName("LI"); //obtengo su referencia
  var i;  
  for (i = 0; i < myNodelist.length; i++) {             //bucle para iterar por los li

      // Bucle para iterar por los elementos LI

      // Creo el contenedor div
      var divContainer = document.createElement("div");
      divContainer.className = "div-container-edit";

      // construyo el span para editar
      var spanEdit = document.createElement("SPAN");
      var editTxt = document.createTextNode("✏"); 
      spanEdit.className = "edit";
      spanEdit.id = "event-edit";
      spanEdit.appendChild(editTxt);
      divContainer.appendChild(spanEdit);

      // construyo el span para cerrar
      var spanClose = document.createElement("SPAN");
      var closeTxt = document.createTextNode("\u00D7");
      spanClose.className = "close";
      spanClose.appendChild(closeTxt);
      divContainer.appendChild(spanClose);

      // Agrego el contenedor div al elemento LI actual
      myNodelist[i].appendChild(divContainer);
     
  }


  //EXPERIMENTAL
  //EXPERIMENTAL
  //BUCLE QUE ITERA POR TODOS LOS ELEMENTO H2 Y P PARA DARLE EL ATRIBUTO DE EDITOR DE CONTENIDO
  function addContenteEditable () {
  var elementsInsideDiv = document.querySelectorAll('h2, p');

      elementsInsideDiv.forEach(function(element) {
          element.setAttribute('contentEditable','false');
      });
  }
  addContenteEditable(); 
  //la llamo de una vez para que corra por lo elementos del front y, cada vez que agregue un nuevo elemento la llamo de nuevo
  //EXPERIMENTAL
  //EXPERIMENTAL`


  //EXPERIMENTAL
  //EXPERIMENTAL
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
  }
  //EXPERIMENTAL
  //EXPERIMENTAL


   //EXPERIMENTAL
  //EXPERIMENTAL
  // FUNCION PARA COLOCAR EN LAS SPAN LA FUNCION DE TOGGLE EDITION
 // Obtén todos los elementos con la clase div-container-edit
 function addeventOnclick() { 
      var editSpans = document.querySelectorAll('.edit#event-edit');
   
      editSpans.forEach(function(span) {
          span.onclick = function() {
              toggleEditing(this);
          };
      });
  }
  addeventOnclick();
  //EXPERIMENTAL
  //EXPERIMENTAL


  //FUNCION DE CIERRE OPERATIVA Y MAS FUNCIONAL
  function eliminateElement() {
  var closeButtons = document.querySelectorAll('.close');
  
      closeButtons.forEach(function(closeButton) {
          closeButton.onclick = function(event) {
              var liToRemove = this.closest('li');
              liToRemove.parentNode.removeChild(liToRemove);
          };
      });
  }



 //funcio que agrega nuevos elementos al front
  function addTask() {

      // obtengo los valores del imput
      var title = document.getElementById("title-task-input").value;
      var description = document.getElementById("description-task-input").value;

      // construyo el li y le doy un nombre de clase
      var li = document.createElement("li");
      li.className = "li-container";

      //construyo la etiqueta del check
      var img = document.createElement("img");
      img.className = "my-check-img";
      img.src = "img/check.png";
      img.style.display = "none";
      li.appendChild(img);

      // construyo los elementos internos del li
      var div = document.createElement("div");
      var h2 = document.createElement("h2");
      var pDescription = document.createElement("p");

      // al h2 y al p creado le doy ids
      h2.id = "title-task";
      pDescription.id ="description-task";

      //construyo otro div para meter los espan y le doy nombre de clase
      var divEspan = document.createElement("div");
      divEspan.className = "div-container-edit";

      //boton de edicion de texto
      var edit    = document.createElement("SPAN");
      var edittxt = document.createTextNode("\u270F");

      // construyo boton de cierre
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");

      //al h2 y p le meto el texto del imput
      h2.textContent = title;
      pDescription.textContent = description;

      // le pego los elementos al div
      div.appendChild(h2);
      div.appendChild(pDescription);

      //modif, le doy clase a la x, le pego el texto
      div.id = "div-container"; //doy nombre al id cada vez que lo construyo

      // asigna el evento click con la función checkElements
      //recuerda este metodo para agregar eventos a los elementos creados de forma dinamica
      div.addEventListener('click', function() {
          checkElements(div);
      });

      //le coloco una clase y le agrego el texto
      edit.className = "edit";
      edit.id = "event-edit";
      edit.appendChild(edittxt);

      //le doy nombre de clase del cierre y se lo pego al span
      span.className = "close";
      span.appendChild(txt);
      
      //al li le pego el div de cierre y de edicion
      li.appendChild(div); 
      li.appendChild(divEspan);

      //al div de edicion le pego tanto el cierre como el de edicion
      divEspan.appendChild(edit);
      divEspan.appendChild(span);

      // obtener el elemento contenedor
      var listOfTasks = document.getElementById("list-of-tasks");

      // adjuntar el nuevo elemento a la lista
      listOfTasks.appendChild(li);

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


  //funcion para hacer chek a la etiqueta
  function checkElements(element) {
  //verifica si el elemento está siendo editado
      if (element.querySelector('#title-task').contentEditable === 'true' ||
          element.querySelector('#description-task').contentEditable === 'true') {
          return; // No realices ninguna acción si el elemento está siendo editado
      }
      // alterna la clase 'marked' en el elemento clicado
      element.classList.toggle('marked');

      var image = element.parentNode.querySelector('.my-check-img');
      if (image.style.display === 'none') {
          image.style.display = 'block'; // Muestra la imagen si estaba oculta
      } else {
      image.style.display = 'none'; // Oculta la imagen si estaba visible
      }
  }

  eliminateElement(); // Llama a esta función después de cargar la pagina