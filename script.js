let map;
let geoData = {};

// estilos para polígonos no mapa
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

/**
 * Inicializa o mapa do Google Maps.
 * - Carrega países de 'countries.json'
 * - Aplica estilo padrão
 * - Configura clique para destacar países
 */
function initmap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -14.2350, lng: -51.9253 },
    zoom: 4,
    mapTypeId: 'roadmap'
  });
  map.data.loadGeoJson('countries.json');
  map.data.setStyle(defaultStyle);
  map.data.addListener('click', event => highlightCountry(event.feature));
}

// Carrega dados adicionais dos países (população, PIB, etc.)
fetch('geoData.json')
  .then(response => response.json())
  .then(data => geoData = data)
  .catch(error => console.error('Erro ao carregar geoData.json:', error));

// Destaca o país selecionado e ajusta o zoom para seus limites.
function highlightCountry(feature) {
  map.data.revertStyle();
  map.data.overrideStyle(feature, highlightStyle);

  const bounds = new google.maps.LatLngBounds();
  feature.getGeometry().forEachLatLng(latlng => bounds.extend(latlng));
  map.fitBounds(bounds);

  showCountryInfo(feature.getProperty('ADMIN'));
}

/**
 * Exibe informações do país na sidebar.
 * Se não encontrar dados, mostra mensagem padrão.
 */
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

/**
 * Busca um país pelo nome exato digitado no input.
 * Exibe alerta se não encontrar correspondência.
 */
function searchCountry() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  let found = false;
  map.data.forEach(feature => {
    if (feature.getProperty("name").toLowerCase() === input) {
      highlightCountry(feature);
      found = true;
    }
  });
  if (!found) alert("País não encontrado!");
}

//Vincula a tecla Enter ao botão de busca.
function bindSearchInput() {
  const input = document.getElementById("searchInput");
  if (input) {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") searchCountry();
    });
  }
}

// Inicializa listener de busca ao carregar a página
document.addEventListener('DOMContentLoaded', bindSearchInput);

//Restaura a sidebar ao estado inicial.
function resetSidebar() {
  document.querySelector('.sidebar').innerHTML = `
    <h1>OneGlobe 🌍</h1>
    <div class="search-wrapper">
      <input type="text" id="searchInput" class="search-input" placeholder="Buscar país..." />
      <button onclick="searchCountry()" class="search-btn">🔍</button>
    </div>
  `;
  bindSearchInput();
}
