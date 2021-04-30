
// Grab the data with d3
d3.json("http://127.0.0.1:5000/api/v1.0/data").then(function(response) {
// d3.json("data.json").then(function(response) {

  // console.log(response.length);
  // console.log(response);

    //function to format date column
    var makeDate = function(value, data, type, params, component){
      //value - original value of the cell
      //data - the data for the row
      //type - the type of mutation occurring  (data|edit)
      //params - the mutatorParams object from the column definition
      //component - when the "type" argument is "edit", this contains the cell component for the edited cell, otherwise it is the column component for the column
      var dt_array = value.trim().split("-");
      var dt = new Date(parseFloat(dt_array[2]), parseFloat(dt_array[1])-1, parseFloat(dt_array[0]));
      return dt;
    };

    // //initialize table
    var table = new Tabulator("#pirate_table", {
        data:response, //assign data to table
        layout:"fitDataStretch",      //fit columns to width of table
        responsiveLayout:"hide",  //hide columns that don't fit on the table
        tooltips:true,            //show tool tips on cells
        height: 600,
        columnCalcs:"both",
        movableColumns:true,      //allow column order to be changed
        resizableRows:true,
        initialSort:[             //set the initial sort order of the data, sort by most recent first
            {column:"Incident Date", dir:"desc"},
        ],
        columns:[                 //define the table columns
          {title:"Incident Date", 
           field:"Incident Date", 
           mutator:makeDate,
           formatter:"datetime", formatterParams:{
              // inputFormat:"DD-MM-YYYY ",
              outputFormat:"YYYY/MM/DD",
              invalidPlaceholder:"(none)",
                // timezone:"America/Los_Angeles",
                },
           sorter:"date",              
          }, 
          // {title:"Test", field:"Incident Date", mutator:makeDate, sorter:"date",
          //  formatter:"datetime", formatterParams:{
          //     // inputFormat:"DD-MM-YYYY ",
          //     outputFormat:"YYYY/MM/DD",
          //     invalidPlaceholder:"(none)",
          //   },
          // }, 
          {title:"Attack Type", field:"Type of Attack", hozAlign:"left", headerFilter:"select", headerFilterParams:{values:true}, topCalc:"count"},
          {title:"Vessel Type", field:"Type of Vessel", width:150, headerFilter:"select", headerFilterParams:{values:true},topCalc:"count"},
          {title:"Location", field:"Decimal Minutes", topCalc:"count", formatter:"textarea",
            formatter:function(cell, formatterParams, onRendered){
              //cell - the cell component
              //formatterParams - parameters set for the column
              //onRendered - function to call when the formatter has been rendered
              var loc = cell.getValue();
              var loc2 = loc.split(",");
              var lat = loc2[0].slice(1,6);
              var long = loc2[1].slice(0,6);
              return ""+ lat + "\xB0 Lat," + long + "\xB0 Lng"; //return the contents of the cell after making them look nice;
            },
          },            
          {title:"Narrative", field:"Narrative", resizable:true, headerFilter:"input", formatter:"textarea",topCalc:"count"},                 
        ],
    })
  });