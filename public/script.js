const TOKEN = 'pk.eyJ1Ijoid29yYWNlIiwiYSI6ImNpeWMxOW1jcjAwYWUyd294ZzQ0YnMyZ3QifQ.ZaWekMcNTGFN-TmpPkf9AA';

mapboxgl.accessToken = TOKEN

console.log('running')

function initMap() {
  console.log('init');
  const map = new mapboxgl.Map({
    container: 'map', 
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-73.991734, 40.698238],
    zoom: 13
  });

  map.on('load', () => {
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
  })
}

$(document).ready(initMap);