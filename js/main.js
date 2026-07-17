let hoteles = [];

fetch("../data/hoteles.json")

.then(response => {
    if (!response.ok) {
        throw new Error("No se pudo cargar el archivo");
    }
    return response.json();
})

.then(data => {
    hoteles = data;

    if(document.querySelector(".contenedor-destacados")){
        mostrarHotelesDestacados();
    }
    if(document.querySelector(".contenedor-hoteles")){
        mostrarHoteles(hoteles, ".contenedor-hoteles");
    }
})

.catch(error => {
    console.log(error);
});

    if(document.querySelector("#contenedor-reservas")){
    mostrarReservas();
    }


function mostrarHoteles(listaHoteles, contenedorClase) {
    const contenedor = document.querySelector(contenedorClase);
    contenedor.innerHTML = "";


    listaHoteles.forEach(hotel => {
        contenedor.innerHTML += `
        <article class="hotel-card">
            <div class="hotel-image">
                <img src="../img/${hotel.folder}/${hotel.gallery[0]}" alt="${hotel.name}">
            </div>

            <div class="hotel-info">
                <span class="hotel-category">
                    ${hotel.category}
                </span>

                <h3>${hotel.name}</h3>

                <p class="hotel-location">
                    📍 ${hotel.location}
                </p>

                <p class="hotel-description">
                    ${hotel.description}
                </p>

                <div class="hotel-footer">
                    <p class="hotel-price">
                        $${hotel.pricePerNight}
                        <span>/ noche</span>
                    </p>
                    <button onclick="verDetalles(${hotel.id})">
                        Ver detalles
                    </button>
                </div>
            </div>
        </article>
        `;
    });

}


function mostrarHotelesDestacados(){

    const ancho = window.innerWidth;
    let cantidad;

    if(ancho < 768){
        cantidad = 3;
    } else if(ancho < 1024){
        cantidad = 4;
    } else {
        cantidad = 6;
    }

    mostrarHoteles(
        hoteles.slice(0, cantidad),
        ".contenedor-destacados"
    );

}

function verDetalles(id){
    console.log("ID enviado:", id);
    window.location.href = `../pages/detalle-hotel.html?id=${id}`;
}

const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

const parametros = new URLSearchParams(window.location.search);

const idHotel = parametros.get("id");

console.log("ID recibido:", idHotel);

fetch("../data/hoteles.json")
.then(response => response.json())
.then(hoteles => {

    const hotel = hoteles.find(h => h.id == idHotel);

    console.log("Hotel encontrado:", hotel);

    // DATOS DEL HOTEL

    document.querySelector("#nombre-hotel").textContent = hotel.name;

    const imagenPrincipal = document.querySelector("#imagen-principal");

    imagenPrincipal.src = `../img/${hotel.folder}/${hotel.gallery[0]}`;
    imagenPrincipal.alt = hotel.name;

    // MINIATURAS

    const miniaturas = document.querySelector("#miniaturas-hotel");

    miniaturas.innerHTML = "";

    hotel.gallery.forEach(imagen => {
        miniaturas.innerHTML += `
            <img 
                class="miniatura"
                src="../img/${hotel.folder}/${imagen}"
                alt="${hotel.name}">
        `;
    });

    // RESERVA

    const precioBase = hotel.pricePerNight;
    const precioMostrar = document.querySelector("#precio-base");
    precioMostrar.textContent = `$${precioBase}`;

    let personasSeleccionadas = 1;
    let nochesSeleccionadas = 1;

    const btnPersonas = document.querySelector("#btn-personas");
    const btnNoches = document.querySelector("#btn-noches");

    const opcionesPersonas = document.querySelector("#opciones-personas");
    const opcionesNoches = document.querySelector("#opciones-noches");

    const totalReserva = document.querySelector("#total-reserva");

    function calcularReserva(){
        const total = precioBase * personasSeleccionadas * nochesSeleccionadas;
        totalReserva.textContent = `$${total}`;
    }

    // ABRIR / CERRAR MENÚ PERSONAS

    btnPersonas.addEventListener("click", ()=>{
        opcionesPersonas.classList.toggle("oculto");
    });

    // ABRIR / CERRAR MENÚ NOCHES

    btnNoches.addEventListener("click", ()=>{
        opcionesNoches.classList.toggle("oculto");
    });

    // SELECCIONAR PERSONAS

    document.querySelectorAll("[data-personas]")
    .forEach(opcion => {

        opcion.addEventListener("click", ()=>{
            personasSeleccionadas = Number(opcion.dataset.personas);

            btnPersonas.textContent = `${personasSeleccionadas} persona${personasSeleccionadas > 1 ? "s" : ""} ▾`;

            opcionesPersonas.classList.add("oculto");

            calcularReserva();
        });
    });

    // SELECCIONAR NOCHES

    document.querySelectorAll("[data-noches]")
    .forEach(opcion => {

        opcion.addEventListener("click", ()=>{

            nochesSeleccionadas = Number(opcion.dataset.noches);

            btnNoches.textContent = `${nochesSeleccionadas} noche${nochesSeleccionadas > 1 ? "s" : ""} ▾`;

            opcionesNoches.classList.add("oculto");

            calcularReserva();
        });
    });

    calcularReserva();

    // BOTÓN RESERVAR

    const botonReserva = document.querySelector("#btn-reservar");

    botonReserva.addEventListener("click", () => {

    const reserva = {
    idReserva: Date.now(),
    idHotel: hotel.id,
    hotel: hotel.name,
    folder: hotel.folder,
    imagen: hotel.gallery[0],
    ubicacion: hotel.location,
    categoria: hotel.category,
    personas: personasSeleccionadas,
    noches: nochesSeleccionadas,
    precioPorNoche: precioBase,
    total: precioBase * personasSeleccionadas * nochesSeleccionadas
};

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    reservas.push(reserva);

    localStorage.setItem("reservas", JSON.stringify(reservas));

    console.log(reservas);

    const mensaje = document.querySelector("#mensaje-reserva");

    mensaje.textContent = "✅¡Reserva realizada con éxito!";

    mensaje.classList.add("mostrar");

    setTimeout(() => {
        mensaje.classList.remove("mostrar");
    }, 3000);

    });

    // Cambiar imagen principal al hacer click en una miniatura

const listaMiniaturas = document.querySelectorAll(".miniatura");

listaMiniaturas.forEach(miniatura => {
    miniatura.addEventListener("click", () => {
        imagenPrincipal.src = miniatura.src;
    });
});

    document.querySelector("#imagen-principal").alt = hotel.name;

    document.querySelector("#ubicacion-hotel").textContent = `📍 ${hotel.location}`;

    document.querySelector("#categoria-hotel").textContent = hotel.category;

    document.querySelector("#descripcion-hotel").textContent = hotel.description;

    document.querySelector("#precio-hotel").textContent = `$${hotel.pricePerNight} / noche`;

    document.querySelector("#precio-base").textContent = `$${hotel.pricePerNight}`;

    const listaServicios = document.querySelector("#servicios-hotel");

    listaServicios.innerHTML = "";

    hotel.services.forEach(servicio => {
    listaServicios.innerHTML += `
        <li>${servicio}</li>
    `;
    });
   
    
    
});

function mostrarReservas(){
    const contenedor = document.querySelector("#contenedor-reservas");
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    contenedor.innerHTML = "";
    reservas.forEach(reserva => {
        contenedor.innerHTML += `

<article class="reserva-card">


    <img src="../img/${reserva.folder}/${reserva.imagen}"  alt="${reserva.hotel}">

    <div class="reserva-info">

        <h3>
            ${reserva.hotel}
        </h3>

        <p>
            📍 ${reserva.ubicacion}
        </p>

        <p>
            ${reserva.categoria}
        </p>

        <p>
            👤 ${reserva.personas} personas
        </p>

        <p>
            🌙 ${reserva.noches} noches
        </p>

        <p class="total">
            💵 $${reserva.total}
        </p>

        <button onclick="cancelarReserva(${reserva.idReserva})">
            🗑️ Cancelar reserva
        </button>
    </div>
    </article>
    `;
    });
}

function cancelarReserva(id){

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    reservas = reservas.filter(reserva => reserva.idReserva !== id);;
    localStorage.setItem(
        "reservas",
        JSON.stringify(reservas)
    );
    mostrarReservas();
}