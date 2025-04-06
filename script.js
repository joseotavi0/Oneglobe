var map;

function initmap() {
    console.log("A função initmap foi chamada!");
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -19.9208, lng: -43.9389 }, // Belo Horizonte
        zoom: 4,
        mapTypeId: 'roadmap'
    });
}
