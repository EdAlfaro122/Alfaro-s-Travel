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
    mostrarHoteles(hoteles, ".contenedor-hoteles");
    iniciarBuscador();
})
.catch(error => {
    const contenedor = document.querySelector(".contenedor-hoteles");

    if (contenedor) {
        contenedor.innerHTML = `
            <p>No se pudieron cargar los hoteles.</p>
        `;
    }
});

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
                <button class="btn-accion btn-detalles" onclick="verDetalles(${hotel.id})">
                    Ver detalles
                </button>
                </div>
            </div>
        </article>
        `;
    });
    }

    function iniciarBuscador() {
    const buscador = document.querySelector("#buscador-hoteles");

    if (!buscador) return;

    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        const hotelesFiltrados = hoteles.filter(hotel => {
            return (
                hotel.name.toLowerCase().includes(texto)
                ||
                hotel.location.toLowerCase().includes(texto)
            );
        });
        mostrarHoteles(
            hotelesFiltrados,
            ".contenedor-hoteles"
        );
    });
}

const filtroPrecio = document.querySelector("#filtro-precio");

if (filtroPrecio) {
    filtroPrecio.addEventListener("change", () => {
        const valor = filtroPrecio.value;
        let hotelesFiltrados = hoteles;

        if (valor === "menor") {
            hotelesFiltrados = hoteles.filter(hotel => hotel.pricePerNight < 100);
        }

        if (valor === "mayor") {
            hotelesFiltrados = hoteles.filter(hotel => hotel.pricePerNight >= 100);
        }

        mostrarHoteles(
            hotelesFiltrados,
            ".contenedor-hoteles"
        );
    });
}

function verDetalles(id) {
    window.location.href = `./detalle-hotel.html?id=${id}`;
}