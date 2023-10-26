// Vaciando el carrito

//  *** Variables ***
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
//Le agregamos lo que haya en la variable localstorage si hay algo
let articulosCarrito = [];
if (localStorage.getItem("array") !== null) {
    articulosCarrito = JSON.parse(localStorage.getItem("array"));
}
//  *** Listeners ***
cargarEventListeners();
function cargarEventListeners() {
  listaCursos.addEventListener("click", añadirCurso);
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Vaciamos el array
    limpiarHTML(); // Limpiamos el HTML
  });
}

//  *** Funciones ***

// Función para añadir cursos al carrito
function añadirCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

// Elimina cursos del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(articulosCarrito);
  }
}

// Lee la información del curso seleccionado.
function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  //Una vez generado los articulosCarrito los almacenamos en localstorage con cada modificacion que se haga
  localStorage.setItem("array", JSON.stringify(articulosCarrito))
  carritoHTML(articulosCarrito);
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
  limpiarHTML();
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td> 
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
            `;
    contenedorCarrito.appendChild(row);
  });
}

// Función para limpiar el HTML (elimina los cursos del tbody)
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.firstChild.remove();
  }
}

//Tendremos que cargar la lista por si hay algo en LocalStorage
document.addEventListener("DOMContentLoaded", () => {
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td> 
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
            `;
    contenedorCarrito.appendChild(row);
  });
});