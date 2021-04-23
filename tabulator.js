//Sample dataset
var pirates = [
    {
      dt_rptd: "2021-04-20",
      atk_no: "044-21",
      atk_type: "boarded",
      vsl_type: "Product Tanker",
      location: [1.27, 104.21],
      loc_det: "Singapore Straits",
      narration: "16.04.2021: 1740 UTC: Posn: 01:16.03N – 104:12.08E, Singapore Straits. Duty Engineer on routine rounds on a tanker underway, noticed someone was trying to open the steering gear entrance door from the poop deck and immediately informed the bridge. Alarm raised and all deck and accommodation lights switched on. Hearing the alarm, the perpetrators escaped. Crew mustered and a search was carried out. Nothing reported stolen. VTIS informed",
      dt_inc: "2021-04-16" 

    },
    {
        dt_rptd: "2021-04-18",
        atk_no: "043-21",
        atk_type: "boarded",
        vsl_type: "Bulk Carrier",
        location: [1.273, 104.23],
        loc_det: "Singapore Straits",
        narration: "16.04.2021: 2100 UTC: Posn: 01:16.4N – 104:14.3E, Singapore Straits. Four robbers boarded a bulk carrier underway. They assaulted and injured the fourth engineer, stole engine spares and escaped. Alarm raised, PA announcement made and crew mustered. On searching the vessel no robbers found. Incident reported to VTS.",
        dt_inc: "2021-04-16" 
  
      },
      {
        dt_rptd: "2021-04-14",
        atk_no: "042-21",
        atk_type: "boarded",
        vsl_type: "LPG Tanker",
        location: [-12.00, -77.218],
        loc_det: "Callao Anchorage",
        narration: "14.04.2021: 0040 UTC: Posn: 12:00.59S - 077:13.12W, Callao Anchorage, Peru. Three robbers armed with knives boarded an anchored LPG tanker. Two robbers assaulted a duty AB on routine rounds. Alarm raised and crew mustered. Seeing the alerted crew, the robbers escaped with the stolen ship’s properties. Incident reported to authorities through local agent.",
        dt_inc: "2021-04-14" 
  
      },
      {
        dt_rptd: "2021-04-12",
        atk_no: "042-21",
        atk_type: "boarded",
        vsl_type: "Bulk Carrier",
        location: [1.258, 104.200],
        loc_det: "Singapore Straits",
        narration: "10.04.2021: 1715 UTC: Posn: 01:15.5N – 104:12.04E, Singapore Straits. Four robbers armed with knives boarded a bulk carrier underway. They broke into the engine room, stole engine spares, and escaped. The robbers were noticed by the duty crew who immediately informed the bridged and raised the alarm. Incident reported to VTIS and a patrol boat escorted the vessel until she was clear of the area. All crew reported safe.",
        dt_inc: "2021-04-10" 
  
      }
  ];

//initialize table
var table = new Tabulator("#example-table", {
    data:pirates, //assign data to table
    layout:"fitDataFill",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that dont fit on the table
    tooltips:true,            //show tool tips on cells
    // addRowPos:"top",          //when adding a new row, add it to the top of the table
    // history:true,             //allow undo and redo actions on the table
    movableColumns:true,      //allow column order to be changed
    resizableRows:true,
    initialSort:[             //set the initial sort order of the data
        {column:"Date Reported", dir:"asc"},
    ],
    columns:[                 //define the table columns
        {title:"Date Reported", field:"dt_rptd", headerFilter:"select", headerFilterParams:{values:true}},
        {title:"Attack Number", field:"atk_no", hozAlign:"left", widthGrow:1},
        {title:"Vessel Type", field:"vsl_type", widthGrow:1, headerFilter:"select", headerFilterParams:{values:true}},
        {title:"Location", field:"location", widthGrow:1},
        {title:"Location Detail", field:"loc_det", widthGrow:1, headerFilter:"input"},
        {title:"Narration", field:"narration", width:300, resizable:true, headerFilter:"input", formatter:"textarea"},
        {title:"Date of Incident", field:"dt_inc", widthGrow:1},
    ],
});