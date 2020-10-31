const map = L.map('map-template').setView([21.148750, -100.931027], 15);//coordenadas y zoom que tendrá el mapa

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);//
//API es openstreetmap es gratis de llave
//Es otro estilo de mapa muy similar al que ofrece google maps

L.tileLayer('https://cdn.lima-labs.com/{z}/{x}/{y}.png?free',
 {attribution: '&copy;  Alíen S.R'}).addTo(map);
//Lima Labs, está es la API, es gratis de llave
//Open carto Based map with Anglicized labels -- es el estilo de mapa

map.locate({enableHighAccuracy: true});//método para la localización, usa la API del navegador para localizar mejor al usuario
map.on('locationfound', e => {
    const coords = [e.latlng.lat, e.latlng.lng];//serán las coordenadas del usuario
    const marker = L.marker(coords);//se usa la constante coords
    marker.bindPopup('¡¡Tú aquí estás!!');
    map.addLayer(marker);//se agrega el marcador
});//con este evento se pedirá acceso a la ubicación del usuario generando un nuevo marcador

/*const marker = L.marker([21.148750, -100.931027]).bindPopup('Aquí puedes encontrarme uwu!');
marker.addTo(map); <----------este ejemplo y el de abajo hacen lo mismo solo son dos formas de hacerlo */

const marker = L.marker([21.148750, -100.931027]);
marker.bindPopup('Aquí puedes encontrarme uwu!!');
map.addLayer(marker);