// 1. LA URL NUEVA (Asegúrate de que termine en /pokemon)
const API_URL = "https://pokeapi-backend-production-4cc9.up.railway.app/pokemon";

const pokeInput = document.getElementById('pokeInput');
const displayInfo = document.getElementById('displayInfo');
const btnModal = document.getElementById('btnModal');
const imgF = document.getElementById('imgF');
const imgB = document.getElementById('imgB');
const modalTitle = document.getElementById('modalTitle');

// 2. LISTENERS PARA LOS BOTONES
document.getElementById('btnSql').addEventListener('click', () => consultar('sql'));
document.getElementById('btnNosql').addEventListener('click', () => consultar('nosql'));

async function consultar(tipo) {
    const nombre = pokeInput.value.toLowerCase().trim();
    
    if (!nombre) {
        alert("Astrid, por favor ingresa un nombre para buscar.");
        return;
    }

    // Limpiamos pantalla y mostramos carga
    displayInfo.innerHTML = `<p class="text-center text-primary">Buscando en ${tipo.toUpperCase()}...</p>`;
    btnModal.disabled = true;

    try {
        // Hacemos la petición a la nueva URL
        const response = await fetch(`${API_URL}/${tipo}/${nombre}`);
        const data = await response.json();

        if (response.ok) {
            // Si todo sale bien, mostramos la info del Pokémon
            displayInfo.innerHTML = `
                <div class="text-center">
                    <h4 class="text-capitalize text-success">${data.nombre}</h4>
                    <hr>
                    <p class="mb-1"><strong>ID:</strong> ${data.id}</p>
                    <p class="mb-1"><strong>Peso:</strong> ${data.peso}</p>
                    <p class="mb-1"><strong>Altura:</strong> ${data.altura}</p>
                    <p class="mb-0 text-muted"><em>Poderes: ${data.poderes}</em></p>
                </div>
            `;

            // Preparamos las imágenes para el modal
            imgF.src = data.imagenFrontal;
            imgB.src = data.imagenPosterior;
            modalTitle.innerText = `Imágenes de ${data.nombre}`;
            btnModal.disabled = false;
        } else {
            // Si el backend responde con error (ej: Pokémon no encontrado)
            displayInfo.innerHTML = `<p class="text-danger text-center">❌ ${data.message}</p>`;
        }
    } catch (error) {
        // Si el servidor está caído o la URL está mal
        displayInfo.innerHTML = `<p class="text-danger text-center">❌ Error: No se pudo conectar con el servidor</p>`;
        console.error("Error de conexión:", error);
    }
}