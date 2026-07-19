let hoteles = [];

fetch("./data/hoteles.json")

    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo");
        }
        return response.json();
    })

    .then(data => {
    hoteles = data;

    if (document.querySelector(".contenedor-destacados")) {
        mostrarHotelesDestacados();
    }
})

    .catch(error => {
        const contenedor = document.querySelector(".contenedor-destacados");

        if (contenedor) {
            contenedor.innerHTML = `
            <p>No se pudieron cargar los hoteles.</p>
        `;
        }
    });

    function mostrarHotelesDestacados() {

    const ancho = window.innerWidth;
    let cantidad;

    if (ancho < 768) {
        cantidad = 3;
    } else if (ancho < 1024) {
        cantidad = 4;
    } else {
        cantidad = 6;
    }

    mostrarHoteles(
        hoteles.slice(0, cantidad),
        ".contenedor-destacados"
    );
}

function mostrarHoteles(listaHoteles, contenedorClase) {
    const contenedor = document.querySelector(contenedorClase);
    contenedor.innerHTML = "";

    listaHoteles.forEach(hotel => {
        contenedor.innerHTML += `
        <article class="hotel-card">
            <div class="hotel-image">
                <img src="./img/${hotel.folder}/${hotel.gallery[0]}" alt="${hotel.name}">
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

function verDetalles(id) {
    window.location.href = `./pages/detalle-hotel.html?id=${id}`;
}






