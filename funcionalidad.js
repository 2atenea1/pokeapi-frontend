// URL de tu Backend en Railway
const API_URL = "https://pokeapi-production-4527.up.railway.app/pokemon";

const pokeInput = document.getElementById('pokeInput');
const displayInfo = document.getElementById('displayInfo');
const btnModal = document.getElementById('btnModal');
const imgF = document.getElementById('imgF');
const imgB = document.getElementById('imgB');
const modalTitle = document.getElementById('modalTitle');

// Listeners para los dos botones
document.getElementById('btnSql').addEventListener('click', () => consultar('sql'));
document.getElementById('btnNosql').addEventListener('click', () => consultar('nosql'));

async function consultar(tipo) {
    const nombre = pokeInput.value.toLowerCase().trim();
    
    if (!nombre) {
        alert("Astrid, ingresa un nombre primero.");
        return;
    }

    displayInfo.innerHTML = `<p class="text-center">Buscando en ${tipo.toUpperCase()}...</p>`;
    btnModal.disabled = true;

    try {
        const response = await fetch(`${API_URL}/${tipo}/${nombre}`);
        const data = await response.json();

        if (response.ok) {
            // Mostrar info en la tarjeta
            displayInfo.innerHTML = `
                <div class="text-center">
                    <h4 class="text-capitalize">${data.nombre}</h4>
                    <p class="mb-1"><strong>ID:</strong> ${data.id}</p>
                    <p class="mb-1"><strong>Peso:</strong> ${data.peso}</p>
                    <p class="mb-1"><strong>Altura:</strong> ${data.altura}</p>
                    <p class="mb-0 text-muted"><em>Poderes: ${data.poderes}</em></p>
                </div>
            `;

            // Preparar imágenes para el modal
            imgF.src = data.imagenFrontal;
            imgB.src = data.imagenPosterior;
            modalTitle.innerText = `Imágenes de ${data.nombre}`;
            btnModal.disabled = false;
        } else {
            displayInfo.innerHTML = `<p class="text-danger text-center">❌ ${data.message}</p>`;
        }
    } catch (error) {
        displayInfo.innerHTML = `<p class="text-danger text-center">❌ Error conectando con Railway</p>`;
        console.error(error);
    }
}