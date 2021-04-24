// //create a variable to hold the dataset
// d3.json("data.json").then(function(data) {
//   console.log(data[0]);
// });

// var pirates = [];

// Grab the data with d3
d3.json("data.json").then(function(response) {

  // Loop through data
  // for (var i = 0; i < response.length; i++) {
  // for (var i = 0; i < 5; i++) {  
  //     // Set the data location property to a variable
  //     pirates = pirates.push(response[i]);
  //     // console.log(thing);
  //     // console.log(thing["Decimal Minutes"]);

  //   };
  // });

  console.log(response.length);

    // //initialize table
    var table = new Tabulator("#example-table", {
        data:response, //assign data to table
        layout:"fitDataStretch",      //fit columns to width of table
        responsiveLayout:"hide",  //hide columns that dont fit on the table
        tooltips:true,            //show tool tips on cells
        columnCalcs:"both",
        movableColumns:true,      //allow column order to be changed
        resizableRows:true,
        initialSort:[             //set the initial sort order of the data
            {column:"Incident Date", dir:"asc"},
        ],
        columns:[                 //define the table columns
          {title:"Incident Date", field:"Incident Date"},  
          {title:"Attack Type", field:"Type of Attack", hozAlign:"left", headerFilter:"select", headerFilterParams:{values:true}, topCalc:"count"},
          {title:"Vessel Type", field:"Type of Vessel", width:150, headerFilter:"select", headerFilterParams:{values:true},topCalc:"count"},
          {title:"Location", field:"Decimal Minutes", width:150, formatter:"textarea",topCalc:"count"},
          {title:"Narrative", field:"Narrative", resizable:true, headerFilter:"input", formatter:"textarea",topCalc:"count"},            
        ],
    })
  });