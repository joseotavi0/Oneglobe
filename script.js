let map;
let geoData = {};

function initmap() {
    console.log("A função initmap foi chamada!");

    // Inicializa o mapa
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 3,
        mapTypeId: 'roadmap'
    });

    // Carrega geometrias dos países
    map.data.loadGeoJson('countries.json');

    // Estilo para os países
    map.data.setStyle({
        fillColor: '#fdfad928',
        strokeColor: '#ff9800',
        strokeWeight: 1
    });

    // Evento de clique na geometria
    map.data.addListener('click', function (event) {
        const countryName = event.feature.getProperty("ADMIN");
        showCountryInfo(countryName);
    });
}

// Carrega dados geopolíticos de forma assíncrona
fetch('geoData.json')
    .then(response => response.json())
    .then(data => {
        geoData = data;
    })
    .catch(error => {
        console.error('Erro ao carregar geoData.json:', error);
    });

// Mostra dados na sidebar
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

// Restaura sidebar padrão
function resetSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.innerHTML = `
        <h1>OneGlobe 🌍</h1>
        <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Notícias</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a href="#">Sobre</a></li>
        </ul>
    `;
}
