function mostrarReservas() {
    const contenedor = document.querySelector("#contenedor-reservas");
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    contenedor.innerHTML = "";

    if(reservas.length === 0){
    contenedor.innerHTML = `
    <h2> Aún no tienes reservas. Explora nuestros hoteles y consigue el ideal para tu próximo viaje.</h2>`;
    return;
    }

        reservas.forEach(reserva => {

        contenedor.innerHTML += `

        <article class="reserva-card">

            <img src="../img/${reserva.folder}/${reserva.imagen}" alt="${reserva.hotel}">

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

                <button 
                class="btn-accion btn-cancelar" 
                onclick="cancelarReserva(${reserva.idReserva})">
                    🗑️ Cancelar reserva
                </button>

            </div>

        </article>

        `;

    });

}

function cancelarReserva(id) {

    Swal.fire({
        title: "¿Cancelar reserva?",
        text: "La reserva será eliminada.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar",
        cancelButtonText: "Volver"

    }).then(resultado => {

        if (resultado.isConfirmed) {

            let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

            reservas = reservas.filter(
                reserva => reserva.idReserva !== id
            );

            localStorage.setItem(
                "reservas",
                JSON.stringify(reservas)
            );

            mostrarReservas();

            Swal.fire(
                "Cancelada",
                "La reserva fue eliminada.",
                "success"
            );
        }

    });

}

    if (document.querySelector("#contenedor-reservas")) {
        mostrarReservas();
    }