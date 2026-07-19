const formulario = document.getElementById("form-suscripcion");

if (formulario) {
    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;

        Swal.fire({
            icon: "success",
            title: `¡Gracias por suscribirte, ${nombre}!`,
            text: "Bienvenido a la comunidad de Alfaro's Travel. Pronto recibirás las mejores promociones.",
            confirmButtonText: "¡Genial!"
        });
        formulario.reset();
    });
}