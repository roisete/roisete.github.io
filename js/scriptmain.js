/*https://github.com/roisete/Proyecto-EV1-ROI*/
/*https://github.com/roisete/roisete.github.io*/

let contenedor = document.getElementById("contenedor-productos");
let titulo = document.getElementById("titulo-principal");
let agregar = document.getElementById("producto-agregar");
let logo = document.querySelectorAll(".logo");
let openMenu = document.getElementById("open-menu");
let closeMenu = document.getElementById("close-menu");
let aside = document.querySelector(".aside-visible");

//GUARDAR LA CANTIDAD DE PRODUCTOS EN LOCAL
let crear_local = () => {
  localStorage.setItem("carrito", 0);
};

let mostrar_local = () => {
  if (localStorage.getItem("carrito") === null) {
    crear_local();
  }
  document.getElementById("numerito").innerHTML =
    localStorage.getItem("carrito");
};

//ACTUALIZAR CARRITO
function actualizarCarrito() {
  let cantidad = parseInt(localStorage.getItem("carrito"));
  cantidad++;
  localStorage.setItem("carrito", cantidad);
  mostrar_local();
}

let carroJSON = JSON.parse(localStorage.getItem("carroJSON")) || [];
document.addEventListener("DOMContentLoaded", mostrar_local);

//BOTONES
let todos = document.getElementById("todos");
let moviles = document.getElementById("moviles");
let portatiles = document.getElementById("portatiles");
let televisiones = document.getElementById("televisiones");

const ficheroJSON = "./js/productos.json";

//FUNCIÓN PARA CAMBIAR EL BOTON ACTIVO
function activarBoton(boton) {
  todos.classList.remove("active");
  moviles.classList.remove("active");
  portatiles.classList.remove("active");
  televisiones.classList.remove("active");
  boton.classList.add("active");
}

//FUNCIÓN PARA CARGAR PRODUCTOS.JSON EN CADA DIV PRODUCTO
function cargarProductos(fichero, categoria = null) {
  //Leer el JSON
  fetch(fichero)
    .then((res) => {
      console.log("Datos de respuesta", res);
      return res.json();
    })
    .then((data) => {
      console.log("Datos del JSON", data);
      //Limpiar el contenido anterior
      contenedor.innerHTML = "";
      //Filtrar por categoria si es necesario
      if (categoria) {
        data = data.filter((prod) => prod.categoria.id === categoria); //moviles, portatiles, televisiones
      }
      //Recorrer los productos y añadirlos al contenedor
      data.forEach((producto) => {
        //Añadir el atributo cantidad a producto (cuantos productos iguales hay en el carrito)
        producto.cantidad = 0;
        //Construir el div del producto
        let divProducto = document.createElement("div");
        divProducto.classList.add("producto");
        let divImagen = document.createElement("img");
        divImagen.classList.add("producto-imagen");
        divImagen.src = producto.imagen;
        divImagen.alt = "Imagen producto";
        divProducto.append(divImagen);
        let divDetalles = document.createElement("div");
        divDetalles.classList.add("producto-detalles");
        let h3 = document.createElement("h3");
        h3.classList.add("producto-titulo");
        h3.textContent = producto.titulo;
        let p = document.createElement("p");
        p.classList.add("producto-precio");
        p.textContent = "$" + producto.precio;
        let btnAgregarProducto = document.createElement("button");
        btnAgregarProducto.classList.add("producto-agregar");
        btnAgregarProducto.textContent = "AGREGAR";
        divDetalles.append(h3);
        divDetalles.append(p);
        divDetalles.append(btnAgregarProducto);
        divProducto.append(divDetalles);
        contenedor.append(divProducto);

        //Boton agregar al carrito, si ya existe incrementamos la cantidad, si no lo añadimos a la lista de productosdel carrito
        btnAgregarProducto.addEventListener("click", () => {
          let productoEncontrado = carroJSON.find(
            (prod) => prod.id === producto.id
          );
          if (productoEncontrado) {
            productoEncontrado.cantidad++;
          } else {
            producto.cantidad = 1;
            carroJSON.push(producto);
          }
          localStorage.setItem("carroJSON", JSON.stringify(carroJSON));
          actualizarCarrito();
          console.log(carroJSON);
        });
      });
    });
}

//CARGAR PRODUCTOS AL CARGAR LA PÁGINA
cargarProductos(ficheroJSON);
activarBoton(todos);

//EVENTOS BOTONES
todos.addEventListener("click", () => {
  activarBoton(todos);
  setTimeout(() => {
    cargarProductos(ficheroJSON);
  }, "300");
});

moviles.addEventListener("click", () => {
  activarBoton(moviles);
  setTimeout(() => {
    titulo.textContent = "Móviles";
    cargarProductos(ficheroJSON, "moviles");
  }, "300");
});

portatiles.addEventListener("click", () => {
  activarBoton(portatiles);
  setTimeout(() => {
    titulo.textContent = "Portátiles";
    cargarProductos(ficheroJSON, "portatiles");
  }, "300");
});

televisiones.addEventListener("click", () => {
  activarBoton(televisiones);
  setTimeout(() => {
    titulo.textContent = "Televisiones";
    cargarProductos(ficheroJSON, "televisiones");
  }, "300");
});

//VOLVER AL LOGIN
logo[1].addEventListener("click", (event) => {
  event.preventDefault();
  if (
    confirm(
      "¿Estás seguro de volver a la ventana de Login? Tus productos en el carrito se perderán."
    )
  ) {
    //PRIMERO BORRAR CARRO JSON Y LOCAL STORAGE
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
  }
});

/*MENU MÓVILES*/
openMenu.addEventListener("click", () => {
  aside.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  aside.classList.remove("active");
});
