console.log("hi")

// const mapDiv = document.querySelector('#map')

// mapDiv.innerHTML = `<div id="leafletmap"></div>`

const map = L.map('map').setView([40.7128, -74.0060], 13)


const mapWindow = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic21pdGhhbTUwIiwiYSI6ImNqeHZ4NWNxcjA5cGYzY29jZjBlNnFub2kifQ.s8Am01fhZoezrzcGmFV1SQ', {
    attribution: "Thank you, Mapbox!",
    minZoom: 9,
    maxZoom: 17,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoic21pdGhhbTUwIiwiYSI6ImNqeHZ4NWNxcjA5cGYzY29jZjBlNnFub2kifQ.s8Am01fhZoezrzcGmFV1SQ'
}).addTo(map)




//ADD MARKER
var marker = L.marker([51.5, -0.09]).addTo(map);

