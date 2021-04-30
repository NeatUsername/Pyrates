
// Grab the data with d3
d3.json("data.json").then(function(response) {

  console.log(response.length);
  // console.log(response);

    // //initialize table
    var table = new Tabulator("#example-table", {
        data:response, //assign data to table
        layout:"fitDataStretch",      //fit columns to width of table
        responsiveLayout:"hide",  //hide columns that dont fit on the table
        tooltips:true,            //show tool tips on cells
        height: 600,
        columnCalcs:"both",
        movableColumns:true,      //allow column order to be changed
        resizableRows:true,
        initialSort:[             //set the initial sort order of the data
            {column:"Incident Date", dir:"asc"},
        ],
        columns:[                 //define the table columns
          {title:"Incident Date", 
           field:"Incident Date", 
           formatter:"datetime", formatterParams:{
              inputFormat:"DD-MM-YYYY ",
              outputFormat:"YYYY/MM/DD",
              invalidPlaceholder:"(none)",
                // timezone:"America/Los_Angeles",
                },
           sorter:"date", sorterParams:{
                format:"YYYY.MM.DD",
                alignEmptyValues:"bottom",
                }             
          },  
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
              return ""+ lat + "\xB0 Lat," + long + "\xB0 Lng"; //return the contents of the cell;
            },
          },
          
          {title:"Test", field:"Narrative", formatter:function(cell, formatterParams, onRendered){
            //cell - the cell component
            //formatterParams - parameters set for the column
            //onRendered - function to call when the formatter has been rendered
            var whole_thing = cell.getValue();
            var dt_array = whole_thing.slice(0,10).split(".");
            var dt = Date(dt_array[2], dt_array[1], dt_array[0])
            return dt; //return the contents of the cell;
            },
          },
          {title:"Narrative", field:"Narrative", resizable:true, headerFilter:"input", formatter:"textarea",topCalc:"count"},            
        ],
    })
  });