let productosEnCarrito = localStorage.getItem("productos_en_carrito");
productosEnCarrito = JSON.parse(productosEnCarrito); 

const contenedorCarritoVacio = document.querySelector("#carrito_vacio");
const contenedorCarritoProductos = document.querySelector("#carrito_productos");
const contenedorCarritoAcciones = document.querySelector("#carrito_acciones");
const contenedorCarritoComprado = document.querySelector("#carrito_comprado");
let botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
const botonVaciar = document.querySelector("#carrito_acciones_vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito_acciones_comprar");
//

function cargarProductosCarrito (){
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("ocultar");
        contenedorCarritoProductos.classList.remove("ocultar");
        contenedorCarritoAcciones.classList.remove("ocultar");
        contenedorCarritoComprado.classList.add("ocultar");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito_producto");
            div.innerHTML = `
                <img class="carrito_producto_img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito_producto_titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito_producto_cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito_producto_precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito_producto_subtotal">
                    <small>SubTotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito_producto_eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>`;
            contenedorCarritoProductos.append(div);
        });
                
        actualizarBotonesEliminar();
        actualizarTotal();
    } else {
        contenedorCarritoVacio.classList.remove("ocultar");
        contenedorCarritoProductos.classList.add("ocultar");
        contenedorCarritoAcciones.classList.add("ocultar");
        contenedorCarritoComprado.classList.add("ocultar");
    }
}


cargarProductosCarrito();

function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){

    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #FF4242, #f30c0c)",
            borderRadius: "1rem",
        },
        onClick: function(){} // Callback after click
        }).showToast();

    
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito(){

    Swal.fire({
        title: 'Estas segur@?',
        text: "Se te borraran todos los articulos del carrito!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar carrito!'
        }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
        })

}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito(){

Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Compra realizada correctamente!',
    showConfirmButton: false,
    timer: 1500
    })

    productosEnCarrito.length = 0;
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("ocultar");
    contenedorCarritoProductos.classList.add("ocultar");
    contenedorCarritoAcciones.classList.add("ocultar");
    contenedorCarritoComprado.classList.remove("ocultar");
}