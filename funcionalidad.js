const API_URL = "https://pokeapi-backend-production-a5ec.up.railway.app/pokemon";
const pokeInput = document.getElementById('pokeInput');
const displayInfo = document.getElementById('displayInfo');
const btnModal = document.getElementById('btnModal');
const imgF = document.getElementById('imgF');
const imgB = document.getElementById('imgB');
const modalTitle = document.getElementById('modalTitle');

document.getElementById('btnSql').addEventListener('click', () => consultar('sql'));
document.getElementById('btnNosql').addEventListener('click', () => consultar('nosql'));

async function consultar(tipo) {
    const nombre = pokeInput.value.toLowerCase().trim();
    if (!nombre) return alert("Ingresa un nombre.");

    displayInfo.innerHTML = `<p class="text-center text-primary">Buscando en ${tipo.toUpperCase()}...</p>`;
    btnModal.disabled = true;

    try {
        const response = await fetch(`${API_URL}/${tipo}/${nombre}`);
        const data = await response.json();

        if (response.ok) {
            displayInfo.innerHTML = `
                <div class="text-center">
                    <h4 class="text-capitalize text-success">${data.nombre}</h4>
                    <p><strong>ID:</strong> ${data.id}</p>
                    <p><strong>Peso:</strong> ${data.peso} | <strong>Altura:</strong> ${data.altura}</p>
                    <p class="text-muted"><strong>Poderes:</strong> ${data.poderes}</p>
                </div>`;

            // Imágenes frontal y posterior de la BD
            imgF.src = data.imagenfrontal || data.imagenFrontal || "";
            imgB.src = data.imagenposterior || data.imagenPosterior || "";

            modalTitle.innerText = `Imágenes de ${data.nombre}`;
            btnModal.disabled = false;
        } else {
            displayInfo.innerHTML = `<p class="text-danger text-center">❌ ${data.error || data.message}</p>`;
        }
    } catch (error) {
        displayInfo.innerHTML = `<p class="text-danger text-center">❌ Error de conexión</p>`;
    }
}