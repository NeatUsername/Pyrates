//creating different base layers

//grayscale map layer
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

//satellite map layer
var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});

//dark map
var darkMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "dark-v10",
  accessToken: API_KEY
});

//add baseMaps so we can filter through different maps
var baseMaps = {
    "Grayscale": lightMap,
    "Dark Map":darkMap,
    "Satellite": satelliteMap

};

// Initialize all of the LayerGroups we'll be using
var layers = {
    Attempted: new L.LayerGroup(),
    Boarded: new L.LayerGroup(),
    Hijacked: new L.LayerGroup(),
    Fired: new L.LayerGroup(),
    Other: new L.LayerGroup()
};

var overlays = {
    "Attempted": layers.Attempted,
    "Boarded": layers.Boarded,
    "Hijacked": layers.Hijacked,
    "Fired Upon": layers.Fired,
    "Other Attack": layers.Other

}

// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: [lightMap, layers.Attempted, layers.Boarded, layers.Hijacked, layers.Fired, layers.Other]
  });

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlays).addTo(myMap);

// Create a legend to display information about our map
var info = L.control({
    position: "bottomright"
  });
  
// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

// Add the info legend to the map
info.addTo(myMap);



// Grab the data with d3
d3.json("pirate-data.json").then(function(response) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();

    //create count for the types of attacks
    var attackTypeCount = {
        Attempted: 0,
        Boarded: 0,
        Hijacked: 0,
        Fired: 0,
        Other: 0
    };
  
    // Create a new marker cluster group
    // var attackMarkers = L.markerClusterGroup();

    // Loop through data
    for (var i = 0; i < response.length; i++) {
  
        // Set the data location property to a variable
        var location = response[i].decMin;

        // //attackType variable so we can use it with diff icons
        // var attackType = Object.assign({}, response[i], attackType[i]);
    
        //diff pirate icons
        var icons ={
            Attempted: L.ExtraMarkers.icon({
                icon: "ion-android-boat",
                markerColor: "blue",
                size: 32

            }),
            Boarded : L.ExtraMarkers.icon({
                icon: "ion-android-boat",
                markerColor: 'yellow',
                size: 32
            }),
            Hijacked : L.ExtraMarkers.icon({
                icon: "ion-android-boat",
                markerColor: 'red',
                size: 32
            }),
            Fired : L.ExtraMarkers.icon({
                icon: "ion-android-boat",
                markerColor: 'green',
                size: 32
            }),
            Other : L.ExtraMarkers.icon({
                icon: "ion-android-boat",
                markerColor: 'black',
                iconColor: "white",
                size: 32
            })
        }  
        
        var pirateIcon2 =L.ExtraMarkers.icon({
            icon: "ion-android-boat",
            markerColor: 'red',
            size: 32,
            shape:"circle"
        
          });

  
        // if statements for diff icons and attack types - making var. attackCode so code is cleaner in next step
        if (response[i].attackType === "Attempted") {
            attackCode = "Attempted";
        }
        else if (response[i].attackType === "Boarded") {
            attackCode = "Boarded";
        }
        else if (response[i].attackType === "Hijacked") {
            attackCode = "Hijacked";
        }
        else if (response[i].attackType === "Fired Upon") {
            attackCode = "Fired";
        }
        else {
            attackCode = "Other";
        }

        //updated attackType count
        attackTypeCount[attackCode]++;

        //making sure the marker variable is correct and icons match
        var attackMarkers = L.marker(location, {
            icon: icons[attackCode]
        });

        //adding markers to layers created above
        attackMarkers.addTo(layers[attackCode]);

        //binding popups to the markers
        attackMarkers.bindPopup("<h3> Attack Type: " + response[i].attackType + "</h3> <hr><h3> Vessel Type: " + response[i].vesselType + 
                                "</h3><hr><h3> Date: " + response[i].date + "</h3><hr><h3> Narrative: </h3>" + "<p>" + response[i].Narrative + "</p>");
        
        
  
        // Add our marker cluster layer to the map
        myMap.addLayer(attackMarkers);

        // Call the updateLegend function, which will... update the legend!
        updateLegend(attackTypeCount);
  
    }
});
// Update the legend's innerHTML with the last updated time and station count
function updateLegend(attackTypeCount) {
    document.querySelector(".legend").innerHTML = [
      "<p class= 'title'> Number of Attacks per Types</p>",
      "<p class='attempted'>Attempted Attacks: " + attackTypeCount.Attempted + "</p>",
      "<p class='boarded'>Boarded Vessels: " + attackTypeCount.Boarded + "</p>",
      "<p class='hijacked'>Hijacked Vessels: " + attackTypeCount.Hijacked + "</p>",
      "<p class='fired'>Fired Upon: " + attackTypeCount.Fired + "</p>",
      "<p class='other'>Other Attacks: " + attackTypeCount.Other + "</p>"
    ].join("");
  }
  
