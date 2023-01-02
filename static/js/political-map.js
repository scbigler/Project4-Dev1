// Creating the map object
var config = {responsive: true}
var myMap = L.map("map", {
    center: [39.0997, -94.5786],
    zoom: 4,
  }, config);
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // // Getting our GeoJSON data
  x = []
  
  d3.json("election.json").then(function (data) {
    x = data.data
    // console.log(x)
  
  })
  
  d3.json("gz_2010_us_040_00_500kjm.json").then(function (data) {
    // console.log(data)
  
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // Styling each feature (in this case, a neighborhood)
      style: function (feature) {
        // console.log("State Info")
  
        state = feature.properties.NAME
        var resultArray = x.filter(sampleObj => sampleObj.State == state);
  
        if (resultArray.length == 1) {
          affiliation = resultArray[0].Gov_Political_Affiliation
          incidentRank = resultArray[0].incident_rank
          perCapitaRank = resultArray[0].per_capita_rank
          populationRank = resultArray[0].population_rank
  
          // console.log(state + " " + resultArray[0].index)
          // console.log("Affiliation = " + Affiliation)
  
          if (affiliation == "Democrat") {
            color = "blue"
          }
          else if (affiliation == "Republican") {
            color = "red"
          }
          // console.log("color = " + color)
        }
  
        return {
          color: color,
          // fillColor: color,
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
  
      // This is called on each feature.
      onEachFeature: function (feature, layer) {
        layer.bindPopup("State: " + state + "<br>Affiliation: " + affiliation + "<br>Population Rank: " + populationRank + "<br>Incident Rank: " + incidentRank + "<br>Per Capita Rank: " + perCapitaRank)
        
  
        // Set the mouse events to change the map styling.
        layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function (event) {
            this.openPopup();
  
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
  
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function (event) {
            this.closePopup();
  
            layer = event.target;
            layer.setStyle({
              fillOpacity: .5
            });
          },
  
          // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
          // click: function (event) {
          //   myMap.fitBounds(event.target.getBounds());
          // }
        });
        // Giving each feature a popup with information that's relevant to it
        // layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");
  
      }
    }).addTo(myMap);
  });