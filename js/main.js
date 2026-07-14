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
    window.location.href = `./pages/detalle-hotel.html?id=${id}`;
}

const id = new URLSearchParams(window.location.search).get("id");
console.log(id);

const parametros = new URLSearchParams(window.location.search);

const idHotel = parametros.get("id");


fetch("../data/hoteles.json")
.then(response => response.json())
.then(hoteles => {

    const hotel = hoteles.find(h => h.id == idHotel);

    console.log(hotel);

});