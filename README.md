# OneGlobe 🌍

**OneGlobe** é um protótipo de mapa interativo que permite explorar países do mundo de forma dinâmica. Ao clicar em um país ou buscá‑lo pelo nome, você visualiza dados como população, PIB, IDH e uma breve descrição, além de um link para notícia de um jornal do país.

---

## Funcionalidades

- Mapa global integrado à Google Maps JavaScript API
- Destaque visual dos países ao clicar
- Busca por nome do país
- Sidebar com informações do país:
  - Nome completo
  - População
  - PIB
  - IDH
  - Descrição resumida
  - Link para notícias de cada pais.
- Responsivo e acessível

---

## Pré‑requisitos

- Navegador moderno com ES6+ compatível
- Chave de API do Google Maps (v3)

---

## Estrutura de Pastas

```text
oneglobe/
├── index.html        # Página principal
├── styles.css        # Estilos CSS modulares
├── script.js         # Lógica de mapa, busca e sidebar
├── countries.json    # GeoJSON com fronteiras dos países
└── geoData.json      # Dados customizados (população, PIB, etc.) 
```

---

## Instalação

1. Clone este repositório:
2. Insira sua **API key** no `<script>` do `index.html`:
---

## Uso

1. Clique em qualquer país para destacá‑lo e ver informações na sidebar.
2. Digite o nome exato no campo de busca e pressione `Enter` ou clique no ícone 🔍.
3. Para voltar ao estado inicial, clique em **Voltar** na sidebar.

