
//streetmap add to map
var streetMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  tileSize: 512,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

//grayscale map layer
var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

// //satellite map layer
// var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.satellite",
//     accessToken: API_KEY
// });

// //dark map
// var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "dark-v10",
//   accessToken: API_KEY
// });

//add baseMaps so we can filter through different maps
var baseMaps = {
    "Grayscale": lightMap,
    "Street Map":streetMap
    // "Satellite": satelliteMap,
    // "Dark Map": darkmap
};

// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3,
    layers: lightMap
  });


// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps).addTo(myMap);

// Grab the data with d3
d3.json("pirate-data.json").then(function(response) {

    // Create a new marker cluster group
    var markers = L.markerClusterGroup();
  
    // Loop through data
    for (var i = 0; i < response.length; i++) {
  
        // Set the data location property to a variable
        var location = response[i].decMin;
    
        //pirate icon
        var pirateIcon =L.icon({
            iconUrl: 'pirate-icon.jpg',
            iconSize: [30,30]
            });
        
        // var pirateIcon2 =L.AwesomeMarkers.icon({
        //     icon: 'boat-outline',
        //     markerColor: 'red'
        //   });

  
        // Check for location property
        if (location) {
  
        // Add a new marker to the cluster group and bind a pop-up
        markers.addLayer(L.marker(location, {
                                icon: pirateIcon
                            }).bindPopup("<h3> Attack Type: " + response[i].attackType + "</h3> <hr><h3> Vessel Type: " + response[i].vesselType + 
                                "</h3><hr><h3> Date: " + response[i].date + "</h3><hr><h3> Narrative: </h3>" + "<p>" + response[i].Narrative + "</p>"));
      }
  
    }
  
    // Add our marker cluster layer to the map
    myMap.addLayer(markers);
  
  });

//
    // // Loop through the cities array and create one marker for each city object
// for (var i = 0; i < pirateData.length; i++) {

//         //   // Conditionals for countries points
//         //   var color = "";
//         //   if (countries[i].points > 200) {
//         //     color = "yellow";
//         //   }
//         //   else if (countries[i].points > 100) {
//         //     color = "blue";
//         //   }
//         //   else if (countries[i].points > 90) {
//         //     color = "green";
//         //   }
//         //   else {
//         //     color = "red";
//         //   }

//         // var markers = L.markerClusterGroup();

//         // var location = pirateData[i].location;

//         // if (location) {

//         //     markers.addLayer(L.marker(pirateData[i].location)
//         //     .bindPop("<h3> Location: " + pirateData[i].loc_det + "</h3> <hr><h3> Attack No: " + pirateData[i].atk_no +  "</h3>" + "<hr><h3> Vessel Type: " + 
//         //              pirateData[i].vsl_type + "</h3><hr><h3> Date: " + pirateData[i].dt_inc));
//         // }

//         // myMap.addLayer(markers);
                

//             //ship icon
//             var pirateIcon =L.icon({
//                 iconUrl: 'pirate-icon.jpg',
//                 iconSize: [30,30],
//                 color: "#EC102B"
//             });

//             // Add markers to map
//                 L.marker(pirateData[i].decMin, {
//                     icon: pirateIcon
//                 }).bindPopup("<h3> Location: " + pirateData[i].loc_det + "</h3> <hr><h3> Attack No: " + pirateData[i].atk_no +  "</h3>" + "<hr><h3> Vessel Type: " + 
//                     pirateData[i].vsl_type + "</h3><hr><h3> Date: " + pirateData[i].dt_inc)
//                     .addTo(myMap);
//             }

         
    



// // Create a new marker
// // Pass in some initial options, and then add it to the map using the addTo method
// var marker = L.marker([45.52, -122.67], {
//   draggable: False,
//   title: "My First Marker"
// }).addTo(myMap);

// // Binding a pop-up to our marker
// marker.bindPopup("Hello There!");



//TEST

//Pirate attack data - this was a test before we scraped info from site to see if mapping would work..IT DID!
