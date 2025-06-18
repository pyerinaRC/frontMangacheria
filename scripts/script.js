const API_URL = "https://lamangacheria-6iwm.onrender.com/comentarios/";

document.getElementById("comentarioForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const autor = document.getElementById("autor").value.trim();
    const contenido = document.getElementById("contenido").value.trim();
    const btn = document.getElementById("btnPublicar");
    const spinner = document.getElementById("spinner");

    if (!autor || !contenido) return;

    // Mostrar spinner y deshabilitar botón
    spinner.classList.remove("d-none");
    btn.disabled = true;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ autor, contenido })
        });

        if (res.ok) {
            document.getElementById("comentarioForm").reset();
            cargarComentarios();
        } else {
            alert("Error al enviar el comentario.");
        }
    } catch (error) {
        console.error("Error al enviar:", error);
    } finally {
        // Ocultar spinner y reactivar botón
        spinner.classList.add("d-none");
        btn.disabled = false;
    }
});


function formatearFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString("es-PE", {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

async function cargarComentarios() {
    const contenedor = document.getElementById("comentariosLista");
    const skeleton = document.getElementById("skeletonLoader");

    skeleton.style.display = "block";
    contenedor.innerHTML = "";

    // Espera 15s antes de cargar la API
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
        const res = await fetch(API_URL);
        const datos = await res.json();

        skeleton.style.display = "none";

        datos.reverse().forEach(item => {
            const div = document.createElement("div");
            div.classList.add("comentario-item", "mb-4", "p-3", "rounded");
            div.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h6 class="fw-bold mb-0">${item.autor}</h6>
                    <small class="text-muted">${formatearFecha(item.creado_en)}</small>
                </div>
                <p class="mb-0">${item.contenido}</p>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error("Error al cargar comentarios:", error);
        skeleton.innerHTML = "<p class='text-danger'>Error al cargar los comentarios.</p>";
    }
}



window.addEventListener("DOMContentLoaded", cargarComentarios);
