let map;
let geoData = {};

// 🎨 Estilos centralizados
const defaultStyle = {
    fillColor: null,
    strokeColor: '#aaaaaa',
    strokeWeight: 0.1,
    fillOpacity: 0
};

const highlightStyle = {
    fillColor: '#e94436',
    fillOpacity: 0.1,
    strokeColor: '#e94436',
    strokeWeight: 1.3
};

function initmap() {
    console.log("A função initmap foi chamada!");

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -14.2350, lng: -51.9253 },
        zoom: 4,
        mapTypeId: 'roadmap'
    });

    map.data.loadGeoJson('countries.json');

    // 🧩 Aplica estilo padrão modular
    map.data.setStyle(defaultStyle);

    map.data.addListener('click', event => {
        highlightCountry(event.feature);
    });
}

fetch('geoData.json')
    .then(response => response.json())
    .then(data => geoData = data)
    .catch(error => {
        console.error('Erro ao carregar geoData.json:', error);
    });

// 🔁 Destaca o país com estilo modular
function highlightCountry(feature) {
    map.data.revertStyle();
    map.data.overrideStyle(feature, highlightStyle);

    const bounds = new google.maps.LatLngBounds();
    feature.getGeometry().forEachLatLng(latlng => bounds.extend(latlng));
    map.fitBounds(bounds);

    const countryName = feature.getProperty('ADMIN');
    showCountryInfo(countryName);
}

function showCountryInfo(countryKey) {
    const info = geoData[countryKey];
    const sidebar = document.querySelector('.sidebar');

    if (info) {
        sidebar.innerHTML = `
            <h1>${info.name}</h1>
            <p><strong>População:</strong> ${info.population}</p>
            <p><strong>PIB:</strong> ${info.pib}</p>
            <p><strong>IDH:</strong> ${info.idh}</p>
            <p>${info.summary}</p>
            <p><strong>Notícia:</strong> <a href="${info.news_link}" target="_blank" rel="noopener noreferrer">${info.news_link}</a></p>
            <button onclick="resetSidebar()">Voltar</button>
        `;
    } else {
        sidebar.innerHTML = `
            <h1>${countryKey}</h1>
            <p>🔍 Nenhuma informação disponível ainda.</p>
            <button onclick="resetSidebar()">Voltar</button>
        `;
    }
}

function searchCountry() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    let found = false;

    map.data.forEach(feature => {
        const countryName = feature.getProperty("name");
        if (countryName.toLowerCase() === input) {
            highlightCountry(feature);
            found = true;
        }
    });

    if (!found) {
        alert("País não encontrado!");
    }
}

// 🔁 Função para conectar Enter ao input
function bindSearchInput() {
    const input = document.getElementById("searchInput");
    if (input) {
        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                searchCountry();
            }
        });
    }
}

// Executa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    bindSearchInput();
});

function resetSidebar() {
    document.querySelector('.sidebar').innerHTML = `
        <h1>OneGlobe 🌍</h1>
        <div class="search-wrapper">
            <input type="text" id="searchInput" class="search-input" placeholder="Buscar país..." />
            <button onclick="searchCountry()" class="search-btn">🔍</button>
        </div>
    `;
    bindSearchInput(); // 🔁 reconecta o Enter no novo input
}

