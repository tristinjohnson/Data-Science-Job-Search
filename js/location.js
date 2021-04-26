// Link to Google Sheets:
// https://docs.google.com/spreadsheets/d/10iiwJDKbTnGyfq-WFlVIBqABARoDHmi90bn8rKT6gR0/edit?usp=sharing

google.charts.load('current', {'packages':['corechart', 'geochart', 'line']});
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets() {
    drawSheetName('GeoMap', 'SELECT A,B', dsMapCount);
    drawSheetName('GeoMap', 'SELECT D,E,F,G', lowHighSalaryByState);
} //drawAllSheets

function drawSheetName(sheetName, query, responseHandler){
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/10iiwJDKbTnGyfq-WFlVIBqABARoDHmi90bn8rKT6gR0/gviz/tq?sheet='
        + sheetName + '&headers=1&tq=' + queryString
    );

    query.send(responseHandler);
} //drawSheetName

function dsMapCount(response){
    var data = response.getDataTable();

    var options = {
        region: 'US',
        displayMode: 'regions',
        resolution: 'provinces',
        colorAxis: {colors: ['#bcd2e8', '#1e3f66']}
    };

    var chart = new google.visualization.GeoChart(document.getElementById("ds-map-count"));
    chart.draw(data, options);
} //Data Science Map

function lowHighSalaryByState (response){
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});

    var options = {
        title: 'Low & High Salaries by State',
        width: 1000,
        height: 600,
        seriesType: 'bars',
        series: {
            0: {targetAxisIndex: 0, color: '#aed9e0'},
            1: {targetAxisIndex: 0, color: '#ffa69e'},
            2: {targetAxisIndex: 1, type: 'line', color: '#5e6472'}
        },
        vAxes: {
            0: {title: 'Salary ($ USD)'},
            1: {title: 'Total Number of Jobs'}
        },
        hAxis: {title: 'State', slantedText: true, slantedTextAngle: 30}
    };

    var chart = new google.visualization.ComboChart(document.getElementById("low-high-salary-state"));
    chart.draw(data, options);
} //low and high salaries by city

function citySelection() {
    cityData = [{state: "California", city_1: "Duarte", salary_low_1: 132, salary_high_1: 208, city_2: "Fremont", salary_low_2: 141, salary_high_2: 194, city_3: "Livermore", salary_low_3: 137.5, salary_high_3: 202.75, city_4: "Los Altos", salary_low_4: 121, salary_high_4: 192, city_5: "Los Gatos", salary_low_5: 143, salary_high_5: 200.5, 
                            city_6: "Marina del Rey", salary_low_6: 114.333333, salary_high_6: 193, city_7: "Menlo Park", salary_low_7: 134, salary_high_7: 194.192308, city_8: "Mountain View", salary_low_8: 139.025, salary_high_8: 198.95, city_9: "Newark", salary_low_9: 140.2, salary_high_9: 211.2, city_10: "Redwood City", salary_low_10: 138.75, salary_high_10: 200.6875, 
                            city_11: "Santa Clara", salary_low_11: 135.630769, salary_high_11: 197.861538, city_12: "Sherman Oaks", salary_low_12: 132, salary_high_12: 208, city_13: "Stanford", salary_low_13: 150, salary_high_13: 237, city_14: "Sunnyvale", salary_low_14: 137, salary_high_14: 196.542857, city_15: "Universal City", salary_low_15: 122.666667, salary_high_15: 196.666667}, 
                {state: "Texas", city_1: "Alvin ", salary_low_1: 90, salary_high_1: 175, city_2: "Baytown ", salary_low_2: 73, salary_high_2: 136, city_3: "Bellaire ", salary_low_3: 73, salary_high_3: 136, city_4: "Carrollton ", salary_low_4: 85.75, salary_high_4: 134.5, city_5: "Grand Prairie ", salary_low_5: 56, salary_high_5: 142, 
                            city_6: "Missouri City ", salary_low_6: 73, salary_high_6: 136, city_7: "Nassau Bay ", salary_low_7: 73, salary_high_7: 136, city_8: "Pasadena ", salary_low_8: 94, salary_high_8: 137, city_9: "Pearland ", salary_low_9: 94.75, salary_high_9: 143.75, city_10: "Schertz ", salary_low_10: 98, salary_high_10: 152, 
                            city_11: "Southlake ", salary_low_11: 85, salary_high_11: 147, city_12: "Spring ", salary_low_12: 138, salary_high_12: 217, city_13: "Sugar Land ", salary_low_13: 73, salary_high_13: 136, city_14: "Webster ", salary_low_14: 73, salary_high_14: 136, city_15: "West University Place ", salary_low_15: 73, salary_high_15: 136},
                {state: "Illinois", city_1: "Bridgeview ", salary_low_1: 69, salary_high_1: 144, city_2: "Chicago ", salary_low_2: 62.4757576, salary_high_2: 108.642424, city_3: "Des Plaines ", salary_low_3: 54, salary_high_3: 91, city_4: "Downers Grove ", salary_low_4: 56.4, salary_high_4: 99, city_5: "Elmhurst ", salary_low_5: 31, salary_high_5: 56, 
                            city_6: "Evanston ", salary_low_6: 42, salary_high_6: 69.5, city_7: "Evergreen Park ", salary_low_7: 69, salary_high_7: 144, city_8: "Hines ", salary_low_8: 60, salary_high_8: 105, city_9: "Lemont ", salary_low_9: 79, salary_high_9: 130, city_10: "Melrose Park ", salary_low_10: 68.5, salary_high_10: 92.5, 
                            city_11: "Naperville ", salary_low_11: 31, salary_high_11: 56, city_12: "Northbrook ", salary_low_12: 65.375, salary_high_12: 101.75, city_13: "Oak Brook ", salary_low_13: 61, salary_high_13: 107, city_14: "Rosemont ", salary_low_14: 74.5, salary_high_14: 126.5, city_15: "Westmont ", salary_low_15: 80, salary_high_15: 124.5},
                {state: "New Jersey", city_1: "Camden ", salary_low_1: 63.1666666666667, salary_high_1: 112, city_2: "Cherry Hill ", salary_low_2: 84, salary_high_2: 145.25, city_3: "Florham Park ", salary_low_3: 133, salary_high_3: 171, city_4: "Fort Lee ", salary_low_4: 119, salary_high_4: 147, city_5: "Franklin Lakes ", salary_low_5: 129, salary_high_5: 210, 
                            city_6: "Gloucester City ", salary_low_6: 93, salary_high_6: 151, city_7: "Jersey City ", salary_low_7: 109, salary_high_7: 154.857142857143, city_8: "Lyndhurst ", salary_low_8: 111, salary_high_8: 181, city_9: "Maywood ", salary_low_9: 96, salary_high_9: 119, city_10: "Middletown ", salary_low_10: 119, salary_high_10: 147, 
                            city_11: "Mount Laurel ", salary_low_11: 71, salary_high_11: 122, city_12: "Newark ", salary_low_12: 101, salary_high_12: 124.5, city_13: "Pennsauken ", salary_low_13: 70, salary_high_13: 154, city_14: "Summit ", salary_low_14: 96, salary_high_14: 119, city_15: "West Orange ", salary_low_15: 146, salary_high_15: 175}, 
                {state: "Pennsylvania", city_1: "Allegheny West ", salary_low_1: 94, salary_high_1: 166, city_2: "Paoli ", salary_low_2: 94, salary_high_2: 166, city_3: "Radnor ", salary_low_3: 82, salary_high_3: 160, city_4: "Bala Cynwyd ", salary_low_4: 93.5, salary_high_4: 158.5, city_5: "Blue Bell ", salary_low_5: 93.5, salary_high_5: 158.5, 
                            city_6: "Spring House ", salary_low_6: 87.1666667, salary_high_6: 151.833333, city_7: "Valley Forge ", salary_low_7: 93, salary_high_7: 151, city_8: "Collegeville ", salary_low_8: 86.5833333, salary_high_8: 149, city_9: "Fort Washington ", salary_low_9: 86.3333333, salary_high_9: 147.333333, city_10: "Boothwyn ", salary_low_10: 82.5, salary_high_10: 141.5, 
                            city_11: "Horsham ", salary_low_11: 82.25, salary_high_11: 136.5, city_12: "Malvern ", salary_low_12: 70.7272727, salary_high_12: 135.545455, city_13: "King of Prussia ", salary_low_13: 76.8181818, salary_high_13: 134.090909, city_14: "Newtown ", salary_low_14: 71, salary_high_14: 130.666667, city_15: "Media ", salary_low_15: 62.5, salary_high_15: 127.5}, 
                {state: "Arizona, Deleware, Florida", city_1: "Chandler, AZ", salary_low_1: 80.4814814814815, salary_high_1: 112.777777777778, city_2: "DC Ranch, AZ", salary_low_2: 83.4285714285714, salary_high_2: 120.571428571429, city_3: "Gilbert, AZ", salary_low_3: 94.75, salary_high_3: 151.5, city_4: "Glendale, AZ", salary_low_4: 82.6, salary_high_4: 102.2, city_5: "Luke AFB, AZ", salary_low_5: 47, salary_high_5: 73, 
                            city_6: "Mesa, AZ", salary_low_6: 70.6, salary_high_6: 115.6, city_7: "Phoenix, AZ", salary_low_7: 73.8242424242424, salary_high_7: 121.612121212121, city_8: "Scottsdale, AZ", salary_low_8: 73.25, salary_high_8: 120.875, city_9: "Tempe, AZ", salary_low_9: 75.1428571428571, salary_high_9: 116.102040816327, city_10: "", salary_low_10: 0, salary_high_10: 0, 
                            city_11: "Wilmington, DE", salary_low_11: 102, salary_high_11: 165.1, city_12: "", salary_low_12: 0, salary_high_12: 0, city_13: "Jacksonville, FL", salary_low_13: 58.6086956521739, salary_high_13: 96.0869565217391, city_14: "", salary_low_14: 0, salary_high_14: 0, city_15: "", salary_low_15: 0, salary_high_15: 0},
                {state: "New York, Ohio", city_1: "Brooklyn, NY", salary_low_1: 108.333333333333, salary_high_1: 159.166666666667, city_2: "Carle Place, NY", salary_low_2: 102, salary_high_2: 121, city_3: "New York, NY", salary_low_3: 112.085808580858, salary_high_3: 158.366336633663, city_4: "Port Washington, NY", salary_low_4: 129, salary_high_4: 210, city_5: "Queens Village, NY", salary_low_5: 156, salary_high_5: 254, 
                            city_6: "Rockville Centre, NY", salary_low_6: 156, salary_high_6: 254, city_7: "Blacklick, NY", salary_low_7: 55, salary_high_7: 113, city_8: "Columbus, OH", salary_low_8: 67.0328947368421, salary_high_8: 121.388157894737, city_9: "Dublin, OH", salary_low_9: 62.1666666666667, salary_high_9: 120, city_10: "Gahanna, OH", salary_low_10: 77, salary_high_10: 137, 
                            city_11: "Hilliard, OH", salary_low_11: 39, salary_high_11: 86, city_12: "Lockbourne, OH", salary_low_12: 98, salary_high_12: 160, city_13: "Slough, OH", salary_low_13: 54.5714285714286, salary_high_13: 109.857142857143, city_14: "West Jefferson, OH", salary_low_14: 76.5, salary_high_14: 136.5, city_15: "Westerville, OH", salary_low_15: 69.3333333333333, salary_high_15: 128}];

    selectedCity = document.getElementById("city-dropdown").value;

    for (i=0; i < cityData.length; i++){
        if (selectedCity == cityData[i].state){
            city_1 = cityData[i].city_1;
            city_2 = cityData[i].city_2;
            city_3 = cityData[i].city_3;
            city_4 = cityData[i].city_4;
            city_5 = cityData[i].city_5;
            city_6 = cityData[i].city_6;
            city_7 = cityData[i].city_7;
            city_8 = cityData[i].city_8;
            city_9 = cityData[i].city_9;
            city_10 = cityData[i].city_10;
            city_11 = cityData[i].city_11;
            city_12 = cityData[i].city_12;
            city_13 = cityData[i].city_13;
            city_14 = cityData[i].city_14;
            city_15 = cityData[i].city_15;
            salary_low_1 = cityData[i].salary_low_1;
            salary_low_2 = cityData[i].salary_low_2;
            salary_low_3 = cityData[i].salary_low_3;
            salary_low_4 = cityData[i].salary_low_4;
            salary_low_5 = cityData[i].salary_low_5;
            salary_low_6 = cityData[i].salary_low_6;
            salary_low_7 = cityData[i].salary_low_7;
            salary_low_8 = cityData[i].salary_low_8;
            salary_low_9 = cityData[i].salary_low_9;
            salary_low_10 = cityData[i].salary_low_10;
            salary_low_11 = cityData[i].salary_low_11;
            salary_low_12 = cityData[i].salary_low_12;
            salary_low_13 = cityData[i].salary_low_13;
            salary_low_14 = cityData[i].salary_low_14;
            salary_low_15 = cityData[i].salary_low_15;
            salary_high_1 = cityData[i].salary_high_1;
            salary_high_2 = cityData[i].salary_high_2;
            salary_high_3 = cityData[i].salary_high_3;
            salary_high_4 = cityData[i].salary_high_4;
            salary_high_5 = cityData[i].salary_high_5;
            salary_high_6 = cityData[i].salary_high_6;
            salary_high_7 = cityData[i].salary_high_7;
            salary_high_8 = cityData[i].salary_high_8;
            salary_high_9 = cityData[i].salary_high_9;
            salary_high_10 = cityData[i].salary_high_10;
            salary_high_11 = cityData[i].salary_high_11;
            salary_high_12 = cityData[i].salary_high_12;
            salary_high_13 = cityData[i].salary_high_13;
            salary_high_14 = cityData[i].salary_high_14;
            salary_high_15 = cityData[i].salary_high_15;

        }
    }

    var data = google.visualization.arrayToDataTable([
        ['City', 'Salary High', 'Salary Low'],
        [city_1, salary_high_1, salary_low_1],
        [city_2, salary_high_2, salary_low_2],
        [city_3, salary_high_3, salary_low_3],
        [city_4, salary_high_4, salary_low_4],
        [city_5, salary_high_5, salary_low_5],
        [city_6, salary_high_6, salary_low_6],
        [city_7, salary_high_7, salary_low_7],
        [city_8, salary_high_8, salary_low_8],
        [city_9, salary_high_9, salary_low_9],
        [city_10, salary_high_10, salary_low_10],
        [city_11, salary_high_11, salary_low_11],
        [city_12, salary_high_12, salary_low_12],
        [city_13, salary_high_13, salary_low_13],
        [city_14, salary_high_14, salary_low_14],
        [city_15, salary_high_15, salary_low_15]
    ]);

    var options = {
        hAxis: {title: 'City'},
        vAxis: {title: 'Salary (in Thousands $USD)'},
        title: 'Top 15 Cities with Highest Paying Salary',
        width: 1200,
        height: 600,
        colors: ['#cdb4db', '#40916c']
    };

    var chart = new google.visualization.SteppedAreaChart(document.getElementById("low-high-salary-city-dropdown"));
    chart.draw(data, options);
} //low and high salaries by city by state
