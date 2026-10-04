/* =========================================================
   PRINTLAB 3D - SCRIPT COMPLETO CORREGIDO
========================================================= */


/* =========================================================
   INTRO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("intro-activa");

    const intro = document.getElementById("intro");

    if (intro) {

        setTimeout(() => {

            intro.classList.add("intro-salir");
            document.body.classList.remove("intro-activa");

            setTimeout(() => {

                if (intro && intro.parentNode) {
                    intro.remove();
                }

            }, 900);

        }, 2000);

    }

});


/* =========================================================
   CONFIGURACIÓN
========================================================= */

const numeroWhatsApp = "5492224483330";


/* =========================================================
   PRODUCTOS
========================================================= */

const productos = [

    {
        id: 1,
        nombre: "Llavero dexter",
        precio: 1000,
        categoria: "llaveros",
        descripcion: "Llavero personalizado con nombre o diseño.",
        imagen: "imagenes/llavero.jpeg",
        emoji: "🔑"
    },

    {
        id: 2,
        nombre: "Soporte para Celular",
        precio: 10000,
        categoria: "soportes",
        descripcion: "Soporte práctico para mantener tu celular.",
        imagen: "imagenes/soporte-celular.jpeg",
        emoji: "📱"
    },

    {
        id: 3,
        nombre: "Organizador de Escritorio",
        precio: 20000,
        categoria: "organizacion",
        descripcion: "Organizador para lápices, herramientas y accesorios.",
        imagen: "imagenes/organizador.png",
        emoji: "🗂️"
    },

    {
        id: 4,
        nombre: "Maceta Geométrica",
        precio: 8000,
        categoria: "decoracion",
        descripcion: "Maceta con diseño geométrico moderno.",
        imagen: "imagenes/maceta-geometrica.jpeg",
        emoji: "🪴"
    },

    {
        id: 5,
        nombre: "Nombres personalizados",
        precio: 4000,
        categoria: "decoracion",
        descripcion: "Nombre personalizado impreso en 3D.",
        imagen: "imagenes/nombres-personalizados.jpeg",
        emoji: "🔤"
    },

    {
        id: 6,
        nombre: "Soporte para Joystick",
        precio: 10000,
        categoria: "soportes",
        descripcion: "Soporte para guardar tu joystick.",
        imagen: "imagenes/soporte-joystick.jpeg",
        emoji: "🎮"
    },
const productos = [

    {
        id: 1,
        nombre: "Llavero dexter",
        precio: 1000,
        categoria: "llaveros",
        descripcion: "Llavero personalizado con nombre o diseño.",
        imagen: "imagenes/llavero.jpeg",
        emoji: "🔑"
    },

    {
        id: 2,
        nombre: "Soporte para Celular",
        precio: 10000,
        categoria: "soportes",
        descripcion: "Soporte práctico para mantener tu celular.",
        imagen: "imagenes/soporte-celular.jpeg",
        emoji: "📱"
    },

    {
        id: 3,
        nombre: "Organizador de Escritorio",
        precio: 20000,
        categoria: "organizacion",
        descripcion: "Organizador para lápices, herramientas y accesorios.",
        imagen: "imagenes/organizador.png",
        emoji: "🗂️"
    },

    {
        id: 4,
        nombre: "Maceta Geométrica",
        precio: 8000,
        categoria: "decoracion",
        descripcion: "Maceta con diseño geométrico moderno.",
        imagen: "imagenes/maceta-geometrica.jpeg",
        emoji: "🪴"
    },

    {
        id: 5,
        nombre: "Nombres personalizados",
        precio: 4000,
        categoria: "decoracion",
        descripcion: "Nombre personalizado impreso en 3D.",
        imagen: "imagenes/nombres-personalizados.jpeg",
        emoji: "🔤"
    },

    {
        id: 6,
        nombre: "Soporte para Joystick",
        precio: 10000,
        categoria: "soportes",
        descripcion: "Soporte para guardar tu joystick.",
        imagen: "imagenes/soporte-joystick.jpeg",
        emoji: "🎮"
    },
{
    id: 7,
    nombre: "Soporte para el dia de la madre",
    precio: 8000,
    categoria: "soportes",
    descripcion: "Soporte para el dia de las madres.",
    imagen: "imagenes/feliz dia madre.jpeg",
    emoji: "📱"
}
];


];


/* =========================================================
   VARIABLES
========================================================= */

let carrito = JSON.parse(
    localStorage.getItem("printlab_carrito") ||
    localStorage.getItem("carritoPrintLab") ||
    "[]"
);

let favoritos = JSON.parse(
    localStorage.getItem("printlab_favoritos") ||
    localStorage.getItem("favoritosPrintLab") ||
    "[]"
);

let categoriaActual = "todos";


/* =========================================================
   NORMALIZAR TEXTO
========================================================= */

function normalizarTexto(valor) {

    return String(valor || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

}


/* =========================================================
   MOSTRAR PRODUCTOS
========================================================= */

function mostrarProductos(lista = productos) {

    const grid =
        document.getElementById("productos-grid");

    if (!grid) return;


    if (lista.length === 0) {

        grid.innerHTML = `
            <div class="carrito-vacio">
                <h3>🔎 No encontramos productos</h3>
                <p>
                    Probá con otro nombre, categoría
                    o palabra.
                </p>
            </div>
        `;

        return;
    }


    grid.innerHTML = lista.map(producto => {

        const esFavorito =
            favoritos.includes(producto.id);


        return `

            <article class="producto-card">

                <div class="producto-imagen">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        onerror="
                            this.style.display='none';
                            this.parentElement.innerHTML +=
                            '<span style=\\'font-size:70px\\'>${producto.emoji}</span>';
                        "
                    >

                    <button
                        class="btn-favorito ${esFavorito ? "activo" : ""}"
                        onclick="toggleFavorito(${producto.id})"
                        aria-label="Agregar a favoritos"
                    >
                        ${esFavorito ? "❤️" : "♡"}
                    </button>

                </div>


                <div class="producto-info">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p>
                        ${producto.descripcion}
                    </p>

                    <div class="producto-precio">
                        $${producto.precio.toLocaleString("es-AR")}
                    </div>


                    <div class="producto-acciones">

                        <button
                            class="btn-ver"
                            onclick="verProducto(${producto.id})"
                        >
                            Ver
                        </button>

                        <button
                            class="btn-principal"
                            onclick="agregarCarrito(${producto.id})"
                        >
                            🛒 Agregar
                        </button>

                    </div>

                </div>

            </article>

        `;

    }).join("");

}


/* =========================================================
   BUSCADOR + FILTROS
========================================================= */

function obtenerProductosFiltrados() {

    const buscador =
        document.getElementById("buscador-productos");


    const texto =
        normalizarTexto(
            buscador
                ? buscador.value
                : ""
        );


    return productos.filter(producto => {

        const coincideCategoria =
            categoriaActual === "todos" ||
            producto.categoria === categoriaActual;


        if (!coincideCategoria) {
            return false;
        }


        if (!texto) {
            return true;
        }


        const contenido = [

            producto.nombre,
            producto.descripcion,
            producto.categoria

        ]
            .map(normalizarTexto)
            .join(" ");


        return contenido.includes(texto);

    });

}


/* =========================================================
   ACTUALIZAR CATÁLOGO
========================================================= */

function actualizarCatalogo() {

    mostrarProductos(
        obtenerProductosFiltrados()
    );

}


/* =========================================================
   FILTRAR PRODUCTOS
========================================================= */

function filtrarProductos(categoria, boton) {

    categoriaActual = categoria;


    document
        .querySelectorAll(".filtro")
        .forEach(btn => {

            btn.classList.remove("activo");

        });


    if (boton) {
        boton.classList.add("activo");
    }


    actualizarCatalogo();

}


/* =========================================================
   BUSCAR PRODUCTOS
========================================================= */

function buscarProductos() {

    actualizarCatalogo();

}


/* =========================================================
   FAVORITOS
========================================================= */

function guardarFavoritos() {

    const datos =
        JSON.stringify(favoritos);


    localStorage.setItem(
        "printlab_favoritos",
        datos
    );

    localStorage.setItem(
        "favoritosPrintLab",
        datos
    );

}


function toggleFavorito(id) {

    const posicion =
        favoritos.indexOf(id);


    if (posicion === -1) {

        favoritos.push(id);

    } else {

        favoritos.splice(posicion, 1);

    }


    guardarFavoritos();

    actualizarCatalogo();

    actualizarContadores();

}


/* =========================================================
   MOSTRAR FAVORITOS
========================================================= */

function mostrarFavoritos() {

    const modal =
        document.getElementById("modal-favoritos");


    const contenido =
        document.getElementById("contenido-favoritos") ||
        document.getElementById("lista-favoritos");


    if (!modal || !contenido) return;


    const productosFavoritos =
        productos.filter(producto =>
            favoritos.includes(producto.id)
        );


    if (productosFavoritos.length === 0) {

        contenido.innerHTML = `
            <div class="favoritos-vacio">
                <p>❤️ Todavía no tenés productos favoritos.</p>
            </div>
        `;

    } else {

        contenido.innerHTML =
            productosFavoritos.map(producto => `

                <div class="item-favorito">

                    <div class="item-favorito-info">

                        <span class="item-favorito-emoji">
                            ${producto.emoji}
                        </span>

                        <div>

                            <h3>
                                ${producto.nombre}
                            </h3>

                            <p>
                                $${producto.precio.toLocaleString("es-AR")}
                            </p>

                        </div>

                    </div>


                    <div>

                        <button
                            class="btn-principal"
                            onclick="agregarCarrito(${producto.id})"
                        >
                            🛒 Agregar
                        </button>

                        <button
                            class="btn-eliminar"
                            onclick="toggleFavorito(${producto.id}); mostrarFavoritos();"
                        >
                            🗑️
                        </button>

                    </div>

                </div>

            `).join("");

    }


    modal.classList.add("visible");

}


/* =========================================================
   CARRITO
========================================================= */

function guardarCarrito() {

    const datos =
        JSON.stringify(carrito);


    localStorage.setItem(
        "printlab_carrito",
        datos
    );

    localStorage.setItem(
        "carritoPrintLab",
        datos
    );

}


/* =========================================================
   AGREGAR AL CARRITO
========================================================= */

function agregarCarrito(id) {

    const producto =
        productos.find(
            producto => producto.id === id
        );


    if (!producto) return;


    const existente =
        carrito.find(
            item => item.id === id
        );


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            emoji: producto.emoji,
            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarContadores();

    mostrarCarrito();

}


/* =========================================================
   MOSTRAR CARRITO
========================================================= */

function mostrarCarrito() {

    const modal =
        document.getElementById("modal-carrito");


    const contenido =
        document.getElementById("contenido-carrito") ||
        document.getElementById("lista-carrito");


    if (!modal || !contenido) return;


    if (carrito.length === 0) {

        contenido.innerHTML = `
            <div class="carrito-vacio">
                <p>🛒 Tu carrito está vacío.</p>
            </div>
        `;

        modal.classList.add("visible");

        return;
    }


    let total = 0;


    contenido.innerHTML =
        carrito.map(item => {

            const subtotal =
                item.precio * item.cantidad;


            total += subtotal;


            return `

                <div class="item-carrito">

                    <div>

                        <h3>
                            ${item.emoji || "📦"}
                            ${item.nombre}
                        </h3>

                        <p>
                            $${item.precio.toLocaleString("es-AR")}
                        </p>

                    </div>


                    <div class="cantidad-controles">

                        <button
                            onclick="cambiarCantidad(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.cantidad}
                        </span>

                        <button
                            onclick="cambiarCantidad(${item.id}, 1)"
                        >
                            +
                        </button>

                    </div>


                    <button
                        class="btn-eliminar"
                        onclick="eliminarDelCarrito(${item.id})"
                    >
                        🗑️
                    </button>

                </div>

            `;

        }).join("");


    contenido.innerHTML += `

        <div class="total-carrito">

            Total:
            $${total.toLocaleString("es-AR")}

        </div>


        <button
            class="btn-principal btn-formulario"
            onclick="enviarPedidoWhatsApp()"
        >
            📲 Pedir por WhatsApp
        </button>

    `;


    modal.classList.add("visible");

}


/* =========================================================
   CAMBIAR CANTIDAD
========================================================= */

function cambiarCantidad(id, cambio) {

    const item =
        carrito.find(
            item => item.id === id
        );


    if (!item) return;


    item.cantidad += cambio;


    if (item.cantidad <= 0) {

        carrito =
            carrito.filter(
                item => item.id !== id
            );

    }


    guardarCarrito();

    actualizarContadores();

    mostrarCarrito();

}


/* =========================================================
   ELIMINAR DEL CARRITO
========================================================= */

function eliminarDelCarrito(id) {

    carrito =
        carrito.filter(
            item => item.id !== id
        );


    guardarCarrito();

    actualizarContadores();

    mostrarCarrito();

}


/* =========================================================
   CONTADORES
========================================================= */

function actualizarContadores() {

    const contadorCarrito =
        document.getElementById("contador-carrito");


    const contadorFavoritos =
        document.getElementById("contador-favoritos");


    const cantidadCarrito =
        carrito.reduce(
            (total, item) =>
                total + item.cantidad,
            0
        );


    if (contadorCarrito) {

        contadorCarrito.textContent =
            cantidadCarrito;

    }


    if (contadorFavoritos) {

        contadorFavoritos.textContent =
            favoritos.length;

    }

}


/* =========================================================
   PEDIDO POR WHATSAPP
========================================================= */

function enviarPedidoWhatsApp() {

    if (carrito.length === 0) return;


    let mensaje =
        "Hola! Quiero hacer un pedido de PrintLab 3D.%0A%0A";


    let total = 0;


    carrito.forEach(item => {

        const subtotal =
            item.precio * item.cantidad;


        total += subtotal;


        mensaje +=
            `• ${item.nombre} x${item.cantidad} - $${subtotal.toLocaleString("es-AR")}%0A`;

    });


    mensaje +=
        `%0A💰 Total aproximado: $${total.toLocaleString("es-AR")}`;


    const url =
        `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;


    window.open(
        url,
        "_blank"
    );


    carrito = [];

    guardarCarrito();

    actualizarContadores();

    cerrarModal("modal-carrito");

}


/* =========================================================
   VER PRODUCTO
========================================================= */

function verProducto(id) {

    const producto =
        productos.find(
            producto => producto.id === id
        );


    if (!producto) return;


    const modal =
        document.getElementById("modal-producto");


    /*
       El HTML utiliza "detalle-producto".
       Antes el script buscaba "contenido-producto",
       por eso el botón "Ver" no funcionaba.
    */

    const contenido =
        document.getElementById("detalle-producto");


    if (!modal || !contenido) return;


    contenido.innerHTML = `

        <div class="detalle-producto">

            <div class="detalle-emoji">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    onerror="
                        this.style.display='none';
                        this.parentElement.innerHTML =
                        '<span style=\\'font-size:100px\\'>${producto.emoji}</span>';
                    "
                >

            </div>


            <div class="detalle-info">

                <h2>
                    ${producto.nombre}
                </h2>

                <p>
                    ${producto.descripcion}
                </p>

                <div class="detalle-precio">
                    $${producto.precio.toLocaleString("es-AR")}
                </div>


                <button
                    class="btn-principal"
                    onclick="agregarCarrito(${producto.id})"
                >
                    🛒 Agregar al carrito
                </button>

            </div>

        </div>

    `;


    modal.classList.add("visible");

}


/* =========================================================
   CERRAR MODALES
========================================================= */

function cerrarModal(id) {

    const modal =
        document.getElementById(id);


    if (modal) {

        modal.classList.remove("visible");

    }

}


/* =========================================================
   CERRAR MODAL HACIENDO CLICK AFUERA
========================================================= */

document.addEventListener("click", event => {

    if (
        event.target.classList &&
        event.target.classList.contains("modal")
    ) {

        event.target.classList.remove("visible");

    }

});


/* =========================================================
   OFERTAS
========================================================= */

function mostrarOfertas() {

    const contenedor =
        document.getElementById("ofertas-grid");


    if (!contenedor) return;


    const ofertas =
        productos.filter(
            producto => producto.oferta
        );


    if (ofertas.length === 0) {

        contenedor.innerHTML = `

            <div class="carrito-vacio">

                <p>
                    Próximamente habrá ofertas.
                </p>

            </div>

        `;

        return;

    }


    contenedor.innerHTML =
        ofertas.map(producto => `

            <article class="producto-card oferta-card">

                <div class="oferta-etiqueta">
                    OFERTA
                </div>

                <div class="producto-imagen">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                    >

                </div>

                <div class="producto-info">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p>

                        <span class="precio-anterior">
                            $${producto.precioAnterior.toLocaleString("es-AR")}
                        </span>

                        $${producto.precio.toLocaleString("es-AR")}

                    </p>

                    <button
                        class="btn-principal"
                        onclick="agregarCarrito(${producto.id})"
                    >
                        🛒 Agregar
                    </button>

                </div>

            </article>

        `).join("");

}


/* =========================================================
   PERSONALIZADOS
========================================================= */

function cargarOpcionesPersonalizadas() {

    const lista =
        document.getElementById(
            "lista-productos-personalizados"
        );


    if (!lista) return;


    lista.innerHTML =
        productos
            .map(producto => `
                <option value="${producto.nombre}">
            `)
            .join("");

}


/* =========================================================
   SELECCIONAR PERSONALIZADO
========================================================= */

function seleccionarPersonalizado(tipo) {

    const input =
        document.getElementById(
            "producto-personalizado"
        );


    const formulario =
        document.getElementById(
            "form-personalizado"
        );


    if (!input || !formulario) return;


    if (tipo === "ayuda") {

        input.value =
            "Necesito ayuda para encontrar un modelo";

    }


    if (tipo === "modelo") {

        input.value =
            "Tengo mi propio modelo 3D";

    }


    formulario.scrollIntoView({

        behavior: "smooth",
        block: "start"

    });


    setTimeout(() => {

        input.focus();

    }, 500);

}


/* =========================================================
   FORMULARIO PERSONALIZADO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const formularioPersonalizado =
        document.getElementById(
            "form-personalizado"
        );


    if (!formularioPersonalizado) return;


    formularioPersonalizado.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const producto =
                document.getElementById(
                    "producto-personalizado"
                ).value.trim();


            const cantidad =
                document.getElementById(
                    "cantidad-personalizada"
                ).value;


            const color =
                document.getElementById(
                    "color-personalizado"
                ).value;


            const tamano =
                document.getElementById(
                    "tamano-personalizado"
                ).value;


            const detalles =
                document.getElementById(
                    "detalles-personalizado"
                ).value.trim();


            const archivo =
                document.getElementById(
                    "archivo-personalizado"
                );


            let mensaje =
                "Hola! Quiero consultar por una impresión 3D personalizada.\n\n";


            mensaje +=
                `🖨️ Qué quiero imprimir: ${producto}\n`;


            mensaje +=
                `📦 Cantidad: ${cantidad}\n`;


            mensaje +=
                `🎨 Color: ${color}\n`;


            mensaje +=
                `📏 Tamaño aproximado: ${tamano}\n`;


            if (detalles) {

                mensaje +=
                    `📝 Detalles: ${detalles}\n`;

            }


            if (
                archivo &&
                archivo.files &&
                archivo.files.length > 0
            ) {

                mensaje +=
                    `📎 Archivo seleccionado: ${archivo.files[0].name}\n`;

            }


            mensaje +=
                "\nQuedo atento/a al presupuesto.";


            const url =
                `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;


            window.open(
                url,
                "_blank"
            );

        }
    );

});


/* =========================================================
   VALIDACIÓN DEL CAMPO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const inputProductoPersonalizado =
        document.getElementById(
            "producto-personalizado"
        );


    if (inputProductoPersonalizado) {

        inputProductoPersonalizado.addEventListener(
            "input",
            function() {

                this.setCustomValidity("");

            }
        );

    }

});


/* =========================================================
   SOLO TEXTO
========================================================= */

function aplicarSoloTexto(id) {

    const campo =
        document.getElementById(id);


    if (!campo) return;


    campo.addEventListener("input", function() {

        this.value =
            this.value.replace(/[0-9]/g, "");

    });

}


/* =========================================================
   CAMPOS SIN NÚMEROS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    aplicarSoloTexto("buscador-productos");

    aplicarSoloTexto("producto-personalizado");

    aplicarSoloTexto("color-personalizado");

    aplicarSoloTexto("detalles-personalizado");

    aplicarSoloTexto("nombre-opinion");

    aplicarSoloTexto("texto-opinion");

});


/* =========================================================
   INICIALIZACIÓN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarOpcionesPersonalizadas();

        mostrarProductos();

        mostrarOfertas();

        actualizarContadores();

    }
);
