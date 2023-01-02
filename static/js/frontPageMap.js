// Perform a GET request to the query URL/
d3.json("/static/js/state_data.geojson").then(function (data) {
  console.log(data);
  createFeatures(data.features);
});

function createFeatures(gunData) {
  

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.state}: 2014-2017 </h3>${"Firearm incidents per capita: " + 
      feature.properties.per_capita.toFixed(2)}</p><p>${"Total number of incidents: " + 
      feature.properties.incident_count}</p><p>${"Population: " + feature.properties.population.toLocaleString('en-US')}</p>`);
  }

  
  var incidents = L.geoJSON(gunData, {
    onEachFeature: onEachFeature
  });
  console.log(incidents)
  
  // Send layer to the createMap function/
  createMap(incidents);
}

function createMap(incidents) {

  // Create the base layers.
  console.log("createMap function top")
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    Street: street,
    Topography: topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Cities: incidents
  };

  // Create our map, 
  var myMap = L.map("map", {
    center: [
      39.0997, -94.5786
    ],
    zoom: 4,
    layers: [street, incidents]
  });

  function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
  alert(e.message);
}
map.locate({setView: true, maxZoom: 16});

map.on('locationerror', onLocationError);

map.on('locationfound', onLocationFound);

 
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
