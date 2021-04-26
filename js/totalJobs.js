// Link to Google Sheets:
// https://docs.google.com/spreadsheets/d/10iiwJDKbTnGyfq-WFlVIBqABARoDHmi90bn8rKT6gR0/edit?usp=sharing

google.charts.load('current', {'packages':['corechart', 'geochart', 'line']});
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets() {
    drawSheetName('JobCount-Title', 'SELECT A,B', dsPopularJobs);
    drawSheetName('Sector', 'SELECT A,B', dsSectors);
    drawSheetName('Industry', 'SELECT A,B', dsIndustries);
} //drawAllSheets

function drawSheetName(sheetName, query, responseHandler){
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/10iiwJDKbTnGyfq-WFlVIBqABARoDHmi90bn8rKT6gR0/gviz/tq?sheet='
        + sheetName + '&headers=1&tq=' + queryString
    );

    query.send(responseHandler);
} //drawSheetName

function dsPopularJobs(response){
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});

    var options = {
        vAxis: {title: 'Job Title', textStyle: {fontSize: 13}},
        hAxis: {title: 'Number of Postings'},
        title: 'Most Popular Data Science Job Titles',
        width: 1300,
        height: 850,
        legend: {position: 'none'},
        colors: ['#004e89']
    };

    var chart = new google.visualization.BarChart(document.getElementById("ds-jobs-popular"));
    chart.draw(data, options);
} //popular data science jobs

function dsSectors(response){
    var data = response.getDataTable();
    
    var options = {
        title: 'Data Science Job Count by Sector',
        width: 1200,
        height: 600,
        is3D: true,
        slices: {
            0: {color: '#081c15', offset: 0.3},
            1: {color: '#1b4332'},
            2: {color: '#2d6a4f'},
            3: {color: '#40916c'},
            4: {color: '#52b788'},
            5: {color: '#74c69d'},
            6: {color: '#95d5b2'},
            7: {color: '#b7e4c7'},
            8: {color: '#d8f3dc'},
            9: {color: '#081c15'},
            10: {color: '#1b4332'},
            11: {color: '#2d6a4f'},
            12: {color: '#40916c'},
            13: {color: '#52b788'},
            14: {color: '#74c69d'},
            15: {color: '#95d5b2'},
            16: {color: '#b7e4c7'},
            17: {color: '#d8f3dc'},
            18: {color: '#52b788'},
            19: {color: '#74c69d'},
            20: {color: '#1b4332'},
            21: {color: '#2d6a4f'},
            22: {color: '#40916c'},
            23: {color: '#52b788'}
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById("ds-sector"));
    chart.draw(data, options);
} //popular data science sectors 

function dsIndustries(response){
    var data = response.getDataTable();
    data.sort({column: 1, desc: true});

    var options = {
        title: 'Top 20 Industries in the Data Science Field',
        vAxis: {title: 'Total Number of Jobs'},
        hAxis: {title: 'Industry', slantedText: true, slantedTextAngle: 45},
        width: 1300,
        height: 900,
        legend: 'none',
        colors: ['#577590']
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("ds-industry"));
    chart.draw(data, options);

} //popular data science industries 
