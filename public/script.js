const TOKEN = config.mbKey;

mapboxgl.accessToken = TOKEN

console.log('running')

function showStations() {
  console.log("hooked up!")
}

function initMap() {
  console.log('init');
  const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-73.991734, 40.698238],
    zoom: 13
  });

  map.on('load', () => { //use promise.all for api calls, extract out to one function, see swapi-box
    $.getJSON('/neighborhoods')
      .then(data => {
        console.log(data);
        map.addLayer({
          'id': 'neighborhoods',
          'type': 'fill',
          'source': {
            'type': 'geojson',
            'data': data
          },
          'layout': {},
          'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
          }
        });

      });
    $.getJSON('/stations')
    .then(data => {
      console.log('stations data: ' + data);
      map.addLayer({
        'id': 'stations',
        'type': 'point',
        'source': {
          'type': 'geojson',
          'data': data
        },
        'layout': {},
        'paint': {
          'fill-color': 'red',
          'fill-opacity': 1.0
        }
      });
    })  
  })
}

$(document).ready(initMap);
