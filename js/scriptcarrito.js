/*https://github.com/roisete/Proyecto-EV1-ROI*/
/*https://github.com/roisete/roisete.github.io*/

let contenedor = document.querySelector(".carrito-productos");
let logo = document.querySelectorAll(".logo");
let carritovacio = document.querySelector(".carrito-vacio");
let carritocomprado = document.querySelector(".carrito-comprado");
let openMenu = document.getElementById("open-menu");
let closeMenu = document.getElementById("close-menu");
let aside = document.querySelector(".aside-visible");

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

document.addEventListener("DOMContentLoaded", () => {
  mostrar_local();
  if (parseInt(localStorage.getItem("carrito")) === 0) {
    carritovacio.style.display = "block";
  }
});

//MOSTRAR LOS PRODUCTOS DEL CARRITO
function cargarCarrito() {
  let carroJSON = JSON.parse(localStorage.getItem("carroJSON")) || [];
  let sumaTotal = 0;

  contenedor.innerHTML = "";

  if (carroJSON.length > 0) {
    carritovacio.style.display = "none";
    carroJSON.forEach((item) => {
      //Construir el producto con sus propiedades
      console.log(item);
      let sumaUnica = item.precio * item.cantidad;
      sumaTotal += sumaUnica;

      let divCarroProducto = document.createElement("div");
      divCarroProducto.classList.add("carrito-producto");

      let divCarroImagen = document.createElement("img");
      divCarroImagen.classList.add("carrito-producto-imagen");
      divCarroImagen.src = item.imagen;
      divCarroImagen.alt = "Imagen producto";
      divCarroProducto.append(divCarroImagen);

      let divCarroTitulo = document.createElement("div");
      divCarroTitulo.classList.add("carrito-producto-titulo");
      let smallTitulo = document.createElement("small");
      smallTitulo.innerText = "Titulo";
      let titulo = document.createElement("h3");
      titulo.innerText = item.titulo;
      divCarroTitulo.append(smallTitulo);
      divCarroTitulo.append(titulo);
      divCarroProducto.append(divCarroTitulo);

      let divCarroCantidad = document.createElement("div");
      divCarroCantidad.classList.add("carrito-producto-cantidad");
      let smallCantidad = document.createElement("small");
      let cantidad = document.createElement("p");
      smallCantidad.innerText = "Cantidad";
      cantidad.innerText = item.cantidad;
      divCarroCantidad.append(smallCantidad);
      divCarroCantidad.append(cantidad);
      divCarroProducto.append(divCarroCantidad);

      let divCarroPrecio = document.createElement("div");
      divCarroPrecio.classList.add("carrito-producto-precio");
      let smallPrecio = document.createElement("small");
      let precio = document.createElement("p");
      smallPrecio.innerText = "Precio";
      precio.innerText = "$" + item.precio;
      divCarroPrecio.append(smallPrecio);
      divCarroPrecio.append(precio);
      divCarroProducto.append(divCarroPrecio);

      let divCarroSubtotal = document.createElement("div");
      divCarroSubtotal.classList.add("carrito-producto-subtotal");
      let smallSubtotal = document.createElement("small");
      let subtotal = document.createElement("p");
      smallSubtotal.innerText = "Subtotal";
      subtotal.innerText = "$" + item.precio * item.cantidad;
      divCarroSubtotal.append(smallSubtotal);
      divCarroSubtotal.append(subtotal);
      divCarroProducto.append(divCarroSubtotal);

      let btnCarroComprar = document.createElement("button");
      btnCarroComprar.classList.add("carrito-producto-boton");
      btnCarroComprar.classList.add("comprar");
      btnCarroComprar.innerText = "Comprar";
      divCarroProducto.append(btnCarroComprar);

      let btnCarroEliminar = document.createElement("button");
      btnCarroEliminar.classList.add("carrito-producto-boton");
      btnCarroEliminar.classList.add("eliminar");
      btnCarroEliminar.innerText = "Eliminar";
      divCarroProducto.append(btnCarroEliminar);
      contenedor.appendChild(divCarroProducto);

      //Eventos de botones de cada producto
      //Botón comprar de cada producto
      btnCarroComprar.addEventListener("click", () => {
        try {
          let numeroProductos = prompt("¿Cuántos deseas comprar?");
          if (numeroProductos === null) {
            throw new Error("Debes introducir un número.");
          }
          numeroProductos = parseInt(numeroProductos);
          if (numeroProductos <= 0) {
            throw new Error("Debes introducir un número mayor que 0.");
          } else if (numeroProductos > item.cantidad) {
            throw new Error("No hay suficientes unidades en el carrito.");
          }
          item.cantidad -= numeroProductos;
          if (item.cantidad === 0) {
            carroJSON.splice(carroJSON.indexOf(item), 1);
          }
          localStorage.setItem("carroJSON", JSON.stringify(carroJSON));
          localStorage.setItem(
            "carrito",
            localStorage.getItem("carrito") - numeroProductos
          );
          mostrar_local();
          location.reload();
        } catch (error) {
          alert("Debes introducir un número válido.");
          return;
        }
      });

      //Botón eliminar de cada producto
      btnCarroEliminar.addEventListener("click", () => {
        try {
          let numeroProductos = prompt("¿Cuántos deseas eliminar?");
          if (numeroProductos === null) {
            throw new Error("Debes introducir un número.");
          }
          numeroProductos = parseInt(numeroProductos);
          if (numeroProductos <= 0) {
            throw new Error("Debes introducir un número mayor que 0.");
          } else if (numeroProductos > item.cantidad) {
            throw new Error("No hay suficientes unidades en el carrito.");
          }
          item.cantidad -= numeroProductos;
          if (item.cantidad === 0) {
            carroJSON.splice(carroJSON.indexOf(item), 1);
          }
          localStorage.setItem("carroJSON", JSON.stringify(carroJSON));
          localStorage.setItem(
            "carrito",
            localStorage.getItem("carrito") - numeroProductos
          );
          mostrar_local();
          location.reload();
        } catch (error) {
          alert("Debes introducir un número válido.");
          return;
        }
      });
    });

    //Botones de comprar o eliminar todos los productos
    let divCarroAcciones = document.createElement("div");
    divCarroAcciones.classList.add("carrito-acciones");

    let divCarroAccionesIzquierda = document.createElement("div");
    divCarroAccionesIzquierda.classList.add("carrito-acciones-izquierda");
    let btnCarroAccionesVaciar = document.createElement("button");
    btnCarroAccionesVaciar.classList.add("carrito-acciones-vaciar");
    btnCarroAccionesVaciar.innerText = "VACIAR CARRITO";
    divCarroAccionesIzquierda.append(btnCarroAccionesVaciar);
    divCarroAcciones.append(divCarroAccionesIzquierda);

    let divCarroAccionesDerecha = document.createElement("div");
    divCarroAccionesDerecha.classList.add("carrito-acciones-derecha");
    let divCarroAccionesTotal = document.createElement("div");
    divCarroAccionesTotal.classList.add("carrito-acciones-total");
    let total = document.createElement("p");
    total.innerText = "Total:";
    let totalValor = document.createElement("p");
    totalValor.id = "Total";
    totalValor.innerText = `$${sumaTotal}`;
    divCarroAccionesTotal.append(total);
    divCarroAccionesTotal.append(totalValor);
    divCarroAccionesDerecha.append(divCarroAccionesTotal);
    let btnCarroAccionesComprar = document.createElement("button");
    btnCarroAccionesComprar.classList.add("carrito-acciones-comprar");
    btnCarroAccionesComprar.innerText = "COMPRAR AHORA";
    divCarroAccionesDerecha.append(btnCarroAccionesComprar);
    divCarroAcciones.append(divCarroAccionesDerecha);
    contenedor.append(divCarroAcciones);

    //Eventos de estos botones
    btnCarroAccionesVaciar.addEventListener("click", () => {
      if (confirm("¿Estás seguro de vaciar el carrito?")) {
        localStorage.removeItem("carrito");
        localStorage.removeItem("carroJSON");
        mostrar_local();
        contenedor.innerHTML = "";
        carritovacio.style.display = "block";
        contenedor.append(carritovacio);
      }
    });

    btnCarroAccionesComprar.addEventListener("click", () => {
      if (
        confirm(
          `¿Estás seguro de comprar todos los productos por un valor de $${sumaTotal}?`
        )
      ) {
        localStorage.removeItem("carrito");
        localStorage.removeItem("carroJSON");
        mostrar_local();
        contenedor.innerHTML = "";
        carritocomprado.style.display = "block";
        contenedor.append(carritocomprado);
      }
    });
  } else {
    carritovacio.style.display = "block";
  }
}

cargarCarrito();

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
