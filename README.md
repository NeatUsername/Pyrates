# PyRates

In the wake of the Suez Canal blockage and reports that ships forced to take different routes would risk pirate attacks, we wanted to learn more about modern piracy.
We turned to the [International Chamber of Commerce](https://www.icc-ccs.org/index.php/piracy-reporting-centre/live-piracy-report) and their piracy reporting data to learn more.

## Web Scraping, Data Cleaning, and API

The first challenge was to gather data and collect it in a mongo database. The detailed incident reports exist on individual webpages, so we wrote a script to navigate to each of more than 2000 pages and scrape each.  Then the location data was cleaned prior to insertion in the mongo db in preparation for use in leaflet.  The cleaned database is then served from a Flask API for use in visualizations.

## Visualizations 

### Leaflet
Everyone loves leaflet.  We wrote .js code to pull data from the database to create an interactive geographic visualization of piracy incidents, filtered by type of attack. 

### Tabulator 
To try out a new .js library, and display our impressive dataset, we turned to Tabulator.  It's a fantastic resource for creating interactive html tables.  This allowed us to easily search and filter the piracy incident report narratives and uncover some interesting trends.

### Plotly
Finally, to understand some fundamentals of our dataset, we turned to the great charting capabilities of plotly.

## Have fun exploring our project!