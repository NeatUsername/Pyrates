// function buildPlot() {
  d3.json("http://127.0.0.1:5000/api/v1.0/data").then(function(data) {
  
    var attackTypeCount = {
        Attempted: 0,
        Boarded: 0,
        Hijacked: 0,
        Fired: 0,
        Other: 0
    };

  // Grab values from the data json object to build the plots
  for (var i = 0; i < data.length; i++) {

    // Add to each attackTypeCount based on Type of Attack Field
    var date = data[i]["Incident Date"];
    if (data[i]["Type of Attack"] === "Attempted") {
        attackTypeCount.Attempted++;
    }
    else if (data[i]["Type of Attack"] === "Boarded") {
        attackTypeCount.Boarded++;
    }
    else if (data[i]["Type of Attack"] === "Hijacked") {
        attackTypeCount.Hijacked++;
    }
    else if (data[i]["Type of Attack"] === "Fired Upon") {
        attackTypeCount.Fired++;
    }
    else {
        attackTypeCount.Other++;
    }
}

var trace1 = {
x: ["Attempted", "Boarded", "Hijacked", "Fired",
  "Other"],
y: [attackTypeCount.Attempted,attackTypeCount.Boarded,attackTypeCount.Hijacked,attackTypeCount.Fired,attackTypeCount.Other],
type: "bar"
};

var data = [trace1];

var layout = {
title: "Pirate Attacks by Attack Type"
};

Plotly.newPlot("plot", data, layout);
