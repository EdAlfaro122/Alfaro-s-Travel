const parametros = new URLSearchParams(window.location.search);
const idHotel = parametros.get("id");

fetch("../data/hoteles.json")
    .then(response => response.json())
    .then(hoteles => {

        const hotel = hoteles.find(h => h.id == idHotel);
        if (!hotel) return;

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

        function calcularReserva() {
            const total = precioBase * personasSeleccionadas * nochesSeleccionadas;
            totalReserva.textContent = `$${total}`;
        }

        // ABRIR / CERRAR MENÚ PERSONAS

        btnPersonas.addEventListener("click", () => {
            opcionesPersonas.classList.toggle("oculto");
        });

        // ABRIR / CERRAR MENÚ NOCHES

        btnNoches.addEventListener("click", () => {
            opcionesNoches.classList.toggle("oculto");
        });

        // SELECCIONAR PERSONAS

        document.querySelectorAll("[data-personas]")
            .forEach(opcion => {
                opcion.addEventListener("click", () => {
                    personasSeleccionadas = Number(opcion.dataset.personas);
                    btnPersonas.textContent = `${personasSeleccionadas} persona${personasSeleccionadas > 1 ? "s" : ""} ▾`;
                    opcionesPersonas.classList.add("oculto");
                    calcularReserva();
                });
            });

        // SELECCIONAR NOCHES

        document.querySelectorAll("[data-noches]")
            .forEach(opcion => {
                opcion.addEventListener("click", () => {
                    nochesSeleccionadas = Number(opcion.dataset.noches);
                    btnNoches.textContent = `${nochesSeleccionadas} noche${nochesSeleccionadas > 1 ? "s" : ""} ▾`;
                    opcionesNoches.classList.add("oculto");
                    calcularReserva();
                });
            });

        calcularReserva();

        // Para el usuario

        function obtenerUsuario() {
        return JSON.parse(
        localStorage.getItem("usuario")
        );

        }

        // Botón reservar

        const botonReserva = document.querySelector("#btn-reservar");

        botonReserva.addEventListener("click", () => {

        let usuario = obtenerUsuario();


        if (!usuario) {
        Swal.fire({
            title: "Antes de reservar",
            text: "¿A nombre de quién hacemos la reserva?",
            input: "text",
            inputPlaceholder: "Escribe tu nombre",
            confirmButtonText: "Continuar"
        })
        .then(resultado => {


            if(resultado.value){
                usuario = {
                    nombre: resultado.value
                };

                localStorage.setItem(
                    "usuario",
                    JSON.stringify(usuario)
                );
                guardarReserva(usuario);
            }
        });
    } else {
        guardarReserva(usuario);
    }
    });

        function guardarReserva(usuario) {

        const reserva = {
            usuario: usuario.nombre,
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

        const reservas = JSON.parse(
            localStorage.getItem("reservas")
        ) || [];

        reservas.push(reserva);

        localStorage.setItem(
            "reservas",
            JSON.stringify(reservas)
        );

        Swal.fire({
            title: "¡Reserva realizada!",
            text: `Reserva creada a nombre de ${usuario.nombre}`,
            icon: "success",
            confirmButtonText: "Aceptar"
        });
        }

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

