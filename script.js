/* =========================================================
   PRINTLAB 3D - SCRIPT
========================================================= */


/* =========================================================
   1. INTRO HUD (ANIMACIÓN SINCRONIZADA CON tu-musica.mp3)
   Fases: espera -> carga -> ensamble -> banner -> ensamble -> logo -> salida
   El sonido suena solo durante la intro y se corta cuando termina.
========================================================= */

/* Tiempos en milisegundos desde que se toca "INICIAR SISTEMA".
   El audio recortado dura unos 15,6 segundos; si cambiás el mp3, ajustá estos valores. */
const TIEMPOS_INTRO = {
    contadorInicio: 0,       // el contador arranca en el mismo instante que el sonido
    contadorDuracion: 3100,  // cuánto tarda en llegar a 100
    ensamble: 3200,          // se arma el cubo 3D
    banner: 5300,            // cartel "SISTEMA LISTO"
    nucleo: 6900,            // vuelve el cubo con los anillos activos
    logo: 9700,              // aparece el logo (final fuerte del sonido)
    salida: 14500,           // empieza a desvanecerse
    cierre: 15300            // se quita la intro y se corta el sonido
};

let introCerrada = false;
let introIniciada = false;
let temporizadoresIntro = [];

function faseIntro(fase, estado) {
    const intro = document.getElementById("intro");
    if (!intro) return;

    intro.setAttribute("data-fase", fase);

    const texto = document.getElementById("hud-estado");
    if (texto && estado) texto.textContent = estado;
}

function programarIntro(ms, accion) {
    temporizadoresIntro.push(setTimeout(accion, ms));
}

/* ---------- Sonido de la intro ---------- */

function reproducirAudioIntro() {
    const audio = document.getElementById("audio-intro");
    if (!audio) return;

    try {
        audio.loop = false;
        audio.currentTime = 0;
        audio.volume = 1;

        const promesa = audio.play();
        if (promesa && promesa.catch) {
            promesa.catch(() => {
                console.log("El navegador bloqueó el audio o falta tu-musica.mp3");
            });
        }
    } catch (e) {}
}

function cortarAudioIntro() {
    const audio = document.getElementById("audio-intro");
    if (!audio || audio.paused) return;

    // Baja el volumen rápido para que el corte no suene seco
    let pasos = 0;
    const total = 6;

    const bajar = setInterval(() => {
        pasos++;

        try {
            audio.volume = Math.max(0, 1 - pasos / total);
        } catch (e) {}

        if (pasos >= total) {
            clearInterval(bajar);

            try {
                audio.pause();
                audio.currentTime = 0;
                audio.volume = 1;
            } catch (e) {}
        }
    }, 40);
}

/* ---------- Animación ---------- */

function animarContador(retraso, duracion) {
    const relleno = document.getElementById("hud-relleno");
    const numero = document.getElementById("hud-num");
    const inicio = performance.now() + retraso;

    function paso(ahora) {
        if (introCerrada) return;

        const bruto = Math.min(Math.max((ahora - inicio) / duracion, 0), 1);
        // Arranca rápido y frena al final, así el contador responde enseguida
        const p = 1 - Math.pow(1 - bruto, 1.7);

        if (relleno) relleno.setAttribute("width", String(304 * p));
        if (numero) numero.textContent = String(Math.round(p * 100));

        if (bruto < 1) requestAnimationFrame(paso);
    }

    requestAnimationFrame(paso);
}

function iniciarIntro() {
    if (introIniciada || introCerrada) return;
    introIniciada = true;

    const t = TIEMPOS_INTRO;

    reproducirAudioIntro();

    faseIntro("carga", "CARGANDO MÓDULOS");
    animarContador(t.contadorInicio, t.contadorDuracion);

    programarIntro(t.ensamble, () => faseIntro("ensamble", "ENSAMBLANDO NÚCLEO"));
    programarIntro(t.banner,   () => faseIntro("banner", "SISTEMA LISTO"));
    programarIntro(t.nucleo,   () => faseIntro("ensamble", "NÚCLEO ACTIVO"));
    programarIntro(t.logo,     () => faseIntro("logo", "BIENVENIDO"));
    programarIntro(t.salida,   () => faseIntro("salida", "ACCEDIENDO"));
    programarIntro(t.cierre,   cerrarIntro);
}

function cerrarIntro() {
    if (introCerrada) return;
    introCerrada = true;

    temporizadoresIntro.forEach(clearTimeout);
    temporizadoresIntro = [];

    // Al terminar la intro se corta el sonido
    cortarAudioIntro();

    document.body.classList.remove("intro-activa");

    const intro = document.getElementById("intro");
    if (!intro) return;

    intro.classList.add("intro-salir");
    intro.style.opacity = "0";
    intro.style.visibility = "hidden";
    intro.style.pointerEvents = "none";

    setTimeout(() => {
        if (intro.parentNode) intro.remove();
    }, 1200);
}

function prepararIntro() {
    const intro = document.getElementById("intro");
    if (!intro) return;

    // El JavaScript cargó bien: se desactiva el cierre automático de emergencia del CSS
    intro.style.animation = "none";

    document.body.classList.add("intro-activa");
    faseIntro("espera", "ESPERANDO ORDEN");

    const btnIniciar = document.getElementById("intro-iniciar");
    const btnSaltar = document.getElementById("intro-saltar");

    if (btnIniciar) {
        btnIniciar.addEventListener("click", iniciarIntro);
        try { btnIniciar.focus({ preventScroll: true }); } catch (e) {}
    }

    if (btnSaltar) {
        btnSaltar.addEventListener("click", cerrarIntro);
    }

    // Si nadie toca el botón, la intro arranca sola (sin sonido) para no quedar trabada
    programarIntro(10000, iniciarIntro);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prepararIntro);
} else {
    prepararIntro();
}


/* =========================================================
   2. CONFIGURACIÓN Y AUDIO SEGURO
========================================================= */

const numeroWhatsApp = "5492224483330";

// Audio de click seguro (no da error si el archivo no existe)
let audioClick = null;
try {
    audioClick = new Audio("sonido-click.mp3");
} catch (e) {}


/* =========================================================
   3. PRODUCTOS
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
    {
        id: 7,
        nombre: "Soporte para el dia de la madre",
        precio: 8000,
        ofertas:true,
        categoria: "soportes",
        descripcion: "Soporte para el dia de las madres.",
        imagen: "imagenes/feliz-dia-madre.jpeg",
        emoji: "📱"
    },
    {
        id: 8,
        nombre: "Figuras pokemon",
        precio: 15000,            // ← cambiá este por el precio nuevo (rebajado)
        categoria: "decoracion",
        descripcion: "Figuras pokemon.",
        imagen: "imagenes-2/figuras-pokemon.jpeg",
        emoji: "🔤"
    }
];


/* =========================================================
   4. VARIABLES Y ALMACENAMIENTO
========================================================= */

function leerLocalStorage(claves, porDefecto) {
    for (const clave of claves) {
        try {
            const valor = localStorage.getItem(clave);
            if (valor) return JSON.parse(valor);
        } catch (e) {}
    }
    return porDefecto;
}

function guardarLocalStorage(claves, datos) {
    const texto = JSON.stringify(datos);
    claves.forEach(clave => {
        try {
            localStorage.setItem(clave, texto);
        } catch (e) {}
    });
}

let carrito = leerLocalStorage(["printlab_carrito", "carritoPrintLab"], []);
let favoritos = leerLocalStorage(["printlab_favoritos", "favoritosPrintLab"], []);
let opiniones = leerLocalStorage(["printlab_opiniones"], []);

let categoriaActual = "todos";


/* =========================================================
   5. FUNCIONES PRINCIPALES
========================================================= */

function normalizarTexto(valor) {
    return String(valor || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

function escaparHTML(valor) {
    return String(valor || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function mostrarProductos(lista = productos) {
    const grid = document.getElementById("productos-grid");
    if (!grid) return;

    if (lista.length === 0) {
        grid.innerHTML = `
            <div class="carrito-vacio">
                <h3>🔎 No encontramos productos</h3>
                <p>Probá con otro nombre, categoría o palabra.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = lista.map(producto => {
        const esFavorito = favoritos.includes(producto.id);
        return `
            <article class="producto-card">
                <div class="producto-imagen">
                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        onerror="
                            this.onerror=null;
                            this.style.display='none';
                            this.insertAdjacentHTML('afterend',
                            '<span style=\\'font-size:70px\\'>${producto.emoji}</span>');
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
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <div class="producto-precio">
                        $${producto.precio.toLocaleString("es-AR")}
                    </div>
                    <div class="producto-acciones">
                        <button class="btn-ver" onclick="verProducto(${producto.id})">
                            Ver
                        </button>
                        <button class="btn-principal" onclick="agregarCarrito(${producto.id})">
                            🛒 Agregar
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function obtenerProductosFiltrados() {
    const buscador = document.getElementById("buscador-productos");
    const texto = normalizarTexto(buscador ? buscador.value : "");

    return productos.filter(producto => {
        const coincideCategoria = categoriaActual === "todos" || producto.categoria === categoriaActual;
        if (!coincideCategoria) return false;
        if (!texto) return true;

        const contenido = [producto.nombre, producto.descripcion, producto.categoria]
            .map(normalizarTexto)
            .join(" ");

        return contenido.includes(texto);
    });
}

function actualizarCatalogo() {
    mostrarProductos(obtenerProductosFiltrados());
}

function filtrarProductos(categoria, boton) {
    categoriaActual = categoria;
    document.querySelectorAll(".filtro").forEach(btn => btn.classList.remove("activo"));
    if (boton) boton.classList.add("activo");
    actualizarCatalogo();
}

function buscarProductos() {
    actualizarCatalogo();
}


/* =========================================================
   6. FAVORITOS Y CARRITO
========================================================= */

function guardarFavoritos() {
    guardarLocalStorage(["printlab_favoritos", "favoritosPrintLab"], favoritos);
}

function toggleFavorito(id) {
    const posicion = favoritos.indexOf(id);
    if (posicion === -1) {
        favoritos.push(id);
    } else {
        favoritos.splice(posicion, 1);
    }
    guardarFavoritos();
    actualizarCatalogo();
    actualizarContadores();
}

function mostrarFavoritos() {
    const modal = document.getElementById("modal-favoritos");
    const contenido = document.getElementById("contenido-favoritos") || document.getElementById("lista-favoritos");
    if (!modal || !contenido) return;

    const productosFavoritos = productos.filter(producto => favoritos.includes(producto.id));

    if (productosFavoritos.length === 0) {
        contenido.innerHTML = `
            <div class="favoritos-vacio">
                <p>❤️ Todavía no tenés productos favoritos.</p>
            </div>
        `;
    } else {
        contenido.innerHTML = productosFavoritos.map(producto => `
            <div class="item-favorito">
                <div class="item-favorito-info">
                    <span class="item-favorito-emoji">${producto.emoji}</span>
                    <div>
                        <h3>${producto.nombre}</h3>
                        <p>$${producto.precio.toLocaleString("es-AR")}</p>
                    </div>
                </div>
                <div>
                    <button class="btn-principal" onclick="agregarCarrito(${producto.id})">
                        🛒 Agregar
                    </button>
                    <button class="btn-eliminar" onclick="toggleFavorito(${producto.id}); mostrarFavoritos();">
                        🗑️
                    </button>
                </div>
            </div>
        `).join("");
    }
    modal.classList.add("visible");
}

function guardarCarrito() {
    guardarLocalStorage(["printlab_carrito", "carritoPrintLab"], carrito);
}

function agregarCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const existente = carrito.find(item => item.id === id);
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

    if (audioClick) {
        try {
            audioClick.currentTime = 0;
            const promesa = audioClick.play();
            if (promesa && promesa.catch) promesa.catch(() => {});
        } catch (e) {}
    }

    guardarCarrito();
    actualizarContadores();
    mostrarCarrito();
}

function mostrarCarrito() {
    const modal = document.getElementById("modal-carrito");
    const contenido = document.getElementById("contenido-carrito") || document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");
    if (!modal || !contenido) return;

    if (carrito.length === 0) {
        contenido.innerHTML = `
            <div class="carrito-vacio">
                <p>🛒 Tu carrito está vacío.</p>
            </div>
        `;
        if (totalCarrito) totalCarrito.innerHTML = "";
        modal.classList.add("visible");
        return;
    }

    let total = 0;
    contenido.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        return `
            <div class="item-carrito">
                <div>
                    <h3>${item.emoji || "📦"} ${item.nombre}</h3>
                    <p>$${item.precio.toLocaleString("es-AR")}</p>
                </div>
                <div class="cantidad-controles">
                    <button onclick="cambiarCantidad(${item.id}, -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                </div>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">🗑️</button>
            </div>
        `;
    }).join("");

    // El total y el botón de WhatsApp van en el contenedor de total
    // (si no existe, se agregan al final de la lista)
    const htmlTotal = `
        Total: $${total.toLocaleString("es-AR")}
    `;
    const htmlBoton = `
        <button class="btn-principal btn-formulario" onclick="enviarPedidoWhatsApp()">
            📲 Pedir por WhatsApp
        </button>
    `;

    if (totalCarrito) {
        totalCarrito.innerHTML = htmlTotal;
        contenido.innerHTML += htmlBoton;
    } else {
        contenido.innerHTML += `<div class="total-carrito">${htmlTotal}</div>${htmlBoton}`;
    }

    modal.classList.add("visible");
}

function cambiarCantidad(id, cambio) {
    const item = carrito.find(item => item.id === id);
    if (!item) return;

    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        carrito = carrito.filter(item => item.id !== id);
    }

    guardarCarrito();
    actualizarContadores();
    mostrarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    actualizarContadores();
    mostrarCarrito();
}

function actualizarContadores() {
    const contadorCarrito = document.getElementById("contador-carrito");
    const contadorFavoritos = document.getElementById("contador-favoritos");
    const cantidadCarrito = carrito.reduce((total, item) => total + item.cantidad, 0);

    if (contadorCarrito) contadorCarrito.textContent = cantidadCarrito;
    if (contadorFavoritos) contadorFavoritos.textContent = favoritos.length;
}

function enviarPedidoWhatsApp() {
    if (carrito.length === 0) return;

    let mensaje = "Hola! Quiero hacer un pedido de PrintLab 3D.\n\n";
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `• ${item.nombre} x${item.cantidad} - $${subtotal.toLocaleString("es-AR")}\n`;
    });

    mensaje += `\n💰 Total aproximado: $${total.toLocaleString("es-AR")}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
    carrito = [];
    guardarCarrito();
    actualizarContadores();
    cerrarModal("modal-carrito");
}

function verProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const modal = document.getElementById("modal-producto");
    const contenido = document.getElementById("detalle-producto");
    if (!modal || !contenido) return;

    contenido.innerHTML = `
        <div class="detalle-producto">
            <div class="detalle-emoji">
                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    onerror="
                        this.onerror=null;
                        this.style.display='none';
                        this.insertAdjacentHTML('afterend',
                        '<span style=\\'font-size:100px\\'>${producto.emoji}</span>');
                    "
                >
            </div>
            <div class="detalle-info">
                <h2>${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
                <div class="detalle-precio">$${producto.precio.toLocaleString("es-AR")}</div>
                <button class="btn-principal" onclick="agregarCarrito(${producto.id})">
                    🛒 Agregar al carrito
                </button>
            </div>
        </div>
    `;

    modal.classList.add("visible");
}

function cerrarModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("visible");
}

document.addEventListener("click", event => {
    if (event.target.classList && event.target.classList.contains("modal")) {
        event.target.classList.remove("visible");
    }
});

function mostrarOfertas() {
    const contenedor = document.getElementById("ofertas-grid");
    if (!contenedor) return;

    const ofertas = productos.filter(p => p.oferta);

    if (ofertas.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio">
                <p>Próximamente habrá ofertas.</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = ofertas.map(producto => `
        <article class="producto-card oferta-card">
            <div class="oferta-etiqueta">OFERTA</div>
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="producto-info">
                <h3>${producto.nombre}</h3>
                <p>
                    <span class="precio-anterior">$${producto.precioAnterior.toLocaleString("es-AR")}</span>
                    $${producto.precio.toLocaleString("es-AR")}
                </p>
                <button class="btn-principal" onclick="agregarCarrito(${producto.id})">
                    🛒 Agregar
                </button>
            </div>
        </article>
    `).join("");
}


/* =========================================================
   7. PERSONALIZADOS
========================================================= */

function cargarOpcionesPersonalizadas() {
    const lista = document.getElementById("lista-productos-personalizados");
    if (!lista) return;
    lista.innerHTML = productos.map(p => `<option value="${p.nombre}">`).join("");
}

function seleccionarPersonalizado(tipo) {
    const input = document.getElementById("producto-personalizado");
    const formulario = document.getElementById("form-personalizado");
    if (!input || !formulario) return;

    if (tipo === "ayuda") input.value = "Necesito ayuda para encontrar un modelo";
    if (tipo === "modelo") input.value = "Tengo mi propio modelo 3D";

    formulario.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => input.focus(), 500);
}

function configurarFormularioPersonalizado() {
    const formulario = document.getElementById("form-personalizado");
    if (!formulario) return;

    formulario.addEventListener("submit", event => {
        event.preventDefault();

        const valor = id => {
            const campo = document.getElementById(id);
            return campo ? campo.value.trim() : "";
        };

        const archivo = document.getElementById("archivo-personalizado");
        const nombreArchivo = archivo && archivo.files && archivo.files[0]
            ? archivo.files[0].name
            : "";

        let mensaje = "Hola! Quiero consultar por una impresión personalizada en PrintLab 3D.\n\n";
        mensaje += `• Qué quiero imprimir: ${valor("producto-personalizado")}\n`;
        mensaje += `• Cantidad: ${valor("cantidad-personalizada")}\n`;
        mensaje += `• Color: ${valor("color-personalizado")}\n`;

        if (valor("tamano-personalizado")) {
            mensaje += `• Tamaño aproximado: ${valor("tamano-personalizado")}\n`;
        }
        if (valor("detalles-personalizado")) {
            mensaje += `• Detalles: ${valor("detalles-personalizado")}\n`;
        }
        if (nombreArchivo) {
            mensaje += `• Archivo 3D: ${nombreArchivo} (te lo envío por este chat)\n`;
        }

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
        window.open(url, "_blank");
    });
}


/* =========================================================
   8. OPINIONES
========================================================= */

function guardarOpiniones() {
    guardarLocalStorage(["printlab_opiniones"], opiniones);
}

function mostrarOpiniones() {
    const contenedor = document.getElementById("opiniones-grid");
    if (!contenedor) return;

    if (opiniones.length === 0) {
        contenedor.innerHTML = `
            <div class="carrito-vacio" style="grid-column: 1 / -1;">
                <p>Todavía no hay opiniones. ¡Sé el primero en dejar la tuya!</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = opiniones.map((opinion, indice) => `
        <article class="opinion-card">
            <div class="opinion-estrellas">${"⭐".repeat(opinion.estrellas)}</div>
            <h3>${escaparHTML(opinion.nombre)}</h3>
            <p>${escaparHTML(opinion.texto)}</p>
            <button class="btn-eliminar-opinion" onclick="eliminarOpinion(${indice})">
                Eliminar
            </button>
        </article>
    `).join("");
}

function eliminarOpinion(indice) {
    opiniones.splice(indice, 1);
    guardarOpiniones();
    mostrarOpiniones();
}

function configurarFormularioOpinion() {
    const formulario = document.getElementById("form-opinion");
    if (!formulario) return;

    formulario.addEventListener("submit", event => {
        event.preventDefault();

        const nombre = document.getElementById("nombre-opinion");
        const estrellas = document.getElementById("estrellas-opinion");
        const texto = document.getElementById("texto-opinion");
        if (!nombre || !estrellas || !texto) return;

        opiniones.unshift({
            nombre: nombre.value.trim(),
            estrellas: parseInt(estrellas.value, 10) || 5,
            texto: texto.value.trim()
        });

        guardarOpiniones();
        mostrarOpiniones();
        formulario.reset();
    });
}


/* =========================================================
   9. INICIALIZACIÓN
========================================================= */

function iniciarSitio() {
    // Cada paso va protegido: si uno falla, los demás siguen funcionando
    const pasos = [
        cargarOpcionesPersonalizadas,
        mostrarProductos,
        mostrarOfertas,
        mostrarOpiniones,
        actualizarContadores,
        configurarFormularioPersonalizado,
        configurarFormularioOpinion
    ];

    pasos.forEach(paso => {
        try {
            paso();
        } catch (error) {
            console.error("Error en " + paso.name + ":", error);
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciarSitio);
} else {
    iniciarSitio();
}

