// Link to Google Sheets:
// https://docs.google.com/spreadsheets/d/10iiwJDKbTnGyfq-WFlVIBqABARoDHmi90bn8rKT6gR0/edit?usp=sharing

google.charts.load('current', {'packages':['corechart', 'geochart', 'line']});
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets() {
    drawSheetName('avgSalary', 'SELECT A,B', salaryRange);
    drawSheetName('Salary-High/Low', 'SELECT A,B,C', lowHighSalary);
} //drawAllSheets

function drawSheetName(sheetName, query, responseHandler){
    var queryString = encodeURIComponent(query);
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/10iiwJDKbTnGyfq-WFlVIBqABARoDHmi90bn8rKT6gR0/gviz/tq?sheet='
        + sheetName + '&headers=1&tq=' + queryString
    );

    query.send(responseHandler);
} //drawSheetName

function salaryRange(response){
    var data = response.getDataTable();
    
    var options = {
        title: 'Total Number of Jobs by Salary Range',
        hAxis: {title: 'Salary Range', slantedText: true, slantedTextAngle: 45},
        vAxis: {title: 'Job Count'},
        width: 1150,
        height: 600,
        annotations: {alwaysOutside: true},
        legend: {position: 'none'},
        colors: ['#52796f']
    };

    var view = new google.visualization.DataView(data);
        view.setColumns([0, 1, {
            calc: function(dt, row){
                return Math.ceil(dt.getFormattedValue(row, 1)) + ' ';
            },
            sourceColumn: 1,
            type: 'string',
            role: 'annotation'
        }]);

    var chart = new google.visualization.ColumnChart(document.getElementById("ds-salary-range"));
    chart.draw(view, options);
} //salary ranges of data science jobs

function lowHighSalary(response){
    var data = response.getDataTable();

    var options = {
        title: 'Low & High Salaries of Different Job Categories',
        vAxis: {title: 'Job Category'},
        hAxis: {title: 'Salary ($USD)'},
        width: 1300,
        height: 900,
        colors: ['#f25f5c', '#247ba0']
    };

    var chart = new google.visualization.BarChart(document.getElementById("ds-low-high-salary"));
    chart.draw(data, options);
} //low and high salaries of data science categories 

function lowHighSalaryByCategory(){
    job_data = [{category: "Computer/Software Engineering", job_1: "Computer Vision Image Analytics Data Scientist", salary_low_1: 110, salary_high_1: 139, job_2: "Computer Scientist", salary_low_2: 136, salary_high_2: 164, job_3: "Computer Vision / Deep Learning Scientist", salary_low_3: 40, salary_high_3: 33, job_4: "Electronics Engineer/Computer Scientist", salary_low_4: 43, salary_high_4: 33, job_5: "Computer Scientist", salary_low_5: 138, salary_high_5: 79, 
                    job_6: "Lead Computer Scientist - Space Data Systems", salary_low_6: 74, salary_high_6: 66, job_7: "Applied Research Scientist - Computer Vision", salary_low_7: 145, salary_high_7: 31, job_8: "Computer Scientist - Cyber-Physical Systems", salary_low_8: 43, salary_high_8: 33,
                    job_9: "Staff Software Scientist, Reproductive Health", salary_low_9: 132, salary_high_9: 76, job_10: "Software Engineer - Data Platform", salary_low_10: 39, salary_high_10: 42, job_11: "Data Scientist- Machine Learning Software Engineer", salary_low_11: 90, salary_high_11: 85,
                    job_12: "Software Developer - Data Science (HCTRA)", salary_low_12: 138, salary_high_12: 79, job_13: "Senior/Staff Software Engineer, Data Infrastructure", salary_low_13: 200, salary_high_13: 50, job_14: "Geospatial Software Developer and Data Scientist", salary_low_14: 93, salary_high_14: 58, job_15: "Senior Software/Data Engineer", salary_low_15: 49, salary_high_15: 29,
                    job_16: "Principal,Software/ Data Engineer", salary_low_16: 100, salary_high_16: 72, job_17: "Software Engineer - Data Analyst", salary_low_17: 55, salary_high_17: 58, job_18: "Staff Software Engineer - Data Platform", salary_low_18: 200, salary_high_18: 50, job_19: "Senior/Staff Software Engineer, Data Infrastructure", salary_low_19: 200, salary_high_19: 50, job_20: "Sr. Principal Software Cloud Streaming Data Engineer", salary_low_20: 71, salary_high_20: 51},
                {category: "Data Scientist", job_1: "Data Science Manager", salary_low_1: 111, salary_high_1: 70, job_2: "Data Scientist", salary_low_2: 120, salary_high_2: 20, job_3: "Senior Data Scientist", salary_low_3: 102, salary_high_3: 19, job_4: "Senior Data Scientist", salary_low_4: 102, salary_high_4: 19,
                    job_5: "Federal - Data Scientist", salary_low_5: 129, salary_high_5: 81, job_6: "Senior Data Scientist, Treasury Product Manager", salary_low_6: 116, salary_high_6: 36, job_7: "Data Scientist - CloudOps", salary_low_7: 110, salary_high_7: 29, job_8: "Lead Data Scientist, R&D Team", salary_low_8: 96, salary_high_8: 23, job_9: "Junior Data Scientist", salary_low_9: 102, salary_high_9: 62,
                    job_10: "Quantum Data Scientist (Industrial-Process sector)", salary_low_10: 113, salary_high_10: 67, job_11: "Lead Data Scientist", salary_low_11: 134, salary_high_11: 84, job_12: "Principal Data Scientist", salary_low_12: 83, salary_high_12: 22, job_13: "Lead Data Scientist", salary_low_13: 75, salary_high_13: 68, job_14: "Data Scientist", salary_low_14: 31, salary_high_14: 25, 
                    job_15: "Data Scientist", salary_low_15: 90, salary_high_15: 85, job_16: "Full Stack Data Scientist Intern", salary_low_16: 39, salary_high_16: 48, job_17: "Data Science Manager", salary_low_17: 138, salary_high_17: 79, job_18: "Data Scientist", salary_low_18: 148, salary_high_18: 26, job_19: "Bioinformatics Data Scientist", salary_low_19: 150, salary_high_19: 87, job_20: "NLP Data Scientist", salary_low_20: 200, salary_high_20: 50}, 
                {category: "Data Engineer", job_1: "Senior Data Engineer (Healthcare Domain experience required)", salary_low_1: 111, salary_high_1: 70, job_2: "Data Engineer", salary_low_2: 96, salary_high_2: 23, job_3: "Data Engineer - Business Intelligence", salary_low_3: 138, salary_high_3: 79, job_4: "Data Engineer - Trust & Safety, Law Enforcement", salary_low_4: 141, salary_high_4: 84, job_5: "Staff Data Engineer", salary_low_5: 200, salary_high_5: 50,
                    job_6: "Data Engineer", salary_low_6: 135, salary_high_6: 79, job_7: "Senior Data Engineer", salary_low_7: 62, salary_high_7: 65, job_8: "Data Engineer III", salary_low_8: 134, salary_high_8: 76,
                    job_9: "Federal - Data Engineer - Senior", salary_low_9: 83, salary_high_9: 71, job_10: "Data Engineer", salary_low_10: 143, salary_high_10: 94, job_11: "SQL Data Engineer", salary_low_11: 65, salary_high_11: 35,
                    job_12: "Cloud Data Engineer - Solution Specialist - USDC", salary_low_12: 99, salary_high_12: 74, job_13: "Senior Data Engineer", salary_low_13: 84, salary_high_13: 72, job_14: "Big Data Engineer w/ Azure", salary_low_14: 84, salary_high_14: 72, job_15: "Lead Big Data Engineer / Architect - Director", salary_low_15: 138, salary_high_15: 79,
                    job_16: "Cloud Data Engineer", salary_low_16: 99, salary_high_16: 75, job_17: "Big data engineer", salary_low_17: 136, salary_high_17: 28, job_18: "Planetary Data Engineer", salary_low_18: 37, salary_high_18: 38, job_19: "Sr Data Engineer (AWS)", salary_low_19: 83, salary_high_19: 22, job_20: "Senior Data Engineer", salary_low_20: 156, salary_high_20: 98},
                {category: "Machine Learning", job_1: "Machine Learning Engineer/Scientist", salary_low_1: 74, salary_high_1: 50, job_2: "Machine Learning & Data Engineer (Remote)", salary_low_2: 102, salary_high_2: 19, job_3: "Senior Data & Machine Learning Scientist", salary_low_3: 62, salary_high_3: 47, job_4: "Senior Applied Machine Learning Engineer", salary_low_4: 136, salary_high_4: 28, job_5: "Machine Learning Engineer", salary_low_5: 114, salary_high_5: 30,
                    job_6: "Senior Research Scientist Specializing in Machine Learning", salary_low_6: 73, salary_high_6: 63, job_7: "Machine Learning Engineer", salary_low_7: 134, salary_high_7: 76, job_8: "NLP/Machine Learning", salary_low_8: 134, salary_high_8: 76, job_9: "Artificial Intelligence / Machine Learning Engineer", salary_low_9: 51, salary_high_9: 28,
                    job_10: "Machine Learning Scientist", salary_low_10: 111, salary_high_10: 64, job_11: "Machine Learning Engineer", salary_low_11: 111, salary_high_11: 64, job_12: "Machine Learning Engineer - Think Tank Team", salary_low_12: 150, salary_high_12: 87, job_13: "AI/ML - Machine Learning Engineer, Advanced Development", salary_low_13: 200, salary_high_13: 50, job_14: "Applied Machine Learning Scientist", salary_low_14: 112, salary_high_14: 66,
                    job_15: "AI/ML - Sr Data Scientist, Siri Data", salary_low_15: 119, salary_high_15: 69, job_16: "Artificial Intelligence / Machine Learning Engineer", salary_low_16: 51, salary_high_16: 28, job_17: "Artificial Intelligence Research Scientist", salary_low_17: 93, salary_high_17: 58, job_18: "Machine Learning Engineer Intern", salary_low_18: 113, salary_high_18: 67, job_19: "Machine Learning/Data Engineer", salary_low_19: 85, salary_high_19: 74, job_20: "Machine Learning Engineer/Scientist", salary_low_20: 111, salary_high_20: 64}, 
                {category: "Data Analyst", job_1: "Data Analyst, Bitcoin Trading Firm", salary_low_1: 156, salary_high_1: 98, job_2: "Senior Data Analyst, Disney", salary_low_2: 133, salary_high_2: 38, job_3: "Data Analyst", salary_low_3: 156, salary_high_3: 98, job_4: "SAP Data Analyst", salary_low_4: 62, salary_high_4: 47, job_5: "Data Analyst", salary_low_5: 119, salary_high_5: 28,
                    job_6: "Data Analyst", salary_low_6: 119, salary_high_6: 28, job_7: "Senior Data Analyst", salary_low_7: 133, salary_high_7: 38, job_8: "Senior Data Analyst, Sales", salary_low_8: 38, salary_high_8: 21, job_9: "Data Analyst", salary_low_9: 90, salary_high_9: 85, job_10: "Data Analyst", salary_low_10: 39, salary_high_10: 48, 
                    job_11: "Microsoft Dynamics CRM Data Analyst", salary_low_11: 55, salary_high_11: 62, job_12: "SQL Data Analyst", salary_low_12: 46, salary_high_12: 58, job_13: "Financial and Data Analyst", salary_low_13: 45, salary_high_13: 36, job_14: "Senior Big Data Analyst", salary_low_14: 47, salary_high_14: 26, job_15: "Senior Data Analyst", salary_low_15: 84, salary_high_15: 72,
                    job_16: "Marketing Data Analyst Coordinator", salary_low_16: 97, salary_high_16: 14, job_17: "Neuroimaging Data Analyst Junior", salary_low_17: 65, salary_high_17: 35, job_18: "Pharmaceutical Customer Data Analyst", salary_low_18: 55, salary_high_18: 46, job_19: "Healthcare Data Analyst", salary_low_19: 134, salary_high_19: 76, job_20: "Senior HR Data Analyst", salary_low_20: 200, salary_high_20: 50}];

    selectedCategory = document.getElementById("dropdown").value;

    for (i=0; i < job_data.length; i++){
        if (selectedCategory == job_data[i].category){
            job_11 = job_data[i].job_1;
            salary_low11 = job_data[i].salary_low_1;
            salary_high11 = job_data[i].salary_high_1;
            job_22 = job_data[i].job_2;
            salary_low22 = job_data[i].salary_low_2;
            salary_high22 = job_data[i].salary_high_2;
            job_33 = job_data[i].job_3;
            salary_low33 = job_data[i].salary_low_3;
            salary_high33 = job_data[i].salary_high_3;
            job_44 = job_data[i].job_4;
            salary_low44 = job_data[i].salary_low_4;
            salary_high44 = job_data[i].salary_high_4;
            job_55 = job_data[i].job_5;
            salary_low55 = job_data[i].salary_low_5;
            salary_high55 = job_data[i].salary_high_5;
            job_66 = job_data[i].job_6;
            salary_low66 = job_data[i].salary_low_6;
            salary_high66 = job_data[i].salary_high_6;
            job_77 = job_data[i].job_7;
            salary_low77 = job_data[i].salary_low_7;
            salary_high77 = job_data[i].salary_high_7;
            job_88 = job_data[i].job_8;
            salary_low88 = job_data[i].salary_low_8;
            salary_high88 = job_data[i].salary_high_8;
            job_99 = job_data[i].job_9;
            salary_low99 = job_data[i].salary_low_9;
            salary_high99 = job_data[i].salary_high_9;
            job_10 = job_data[i].job_10;
            salary_low10 = job_data[i].salary_low_10;
            salary_high10 = job_data[i].salary_high_10;
            job_110 = job_data[i].job_11;
            job_120 = job_data[i].job_12;
            job_130 = job_data[i].job_13;
            job_140 = job_data[i].job_14;
            job_150 = job_data[i].job_15;
            job_160 = job_data[i].job_16;
            job_170 = job_data[i].job_17;
            job_180 = job_data[i].job_18;
            job_190 = job_data[i].job_19;
            job_200 = job_data[i].job_20;
            salary_low110 = job_data[i].salary_low_11;
            salary_low120 = job_data[i].salary_low_12;
            salary_low130 = job_data[i].salary_low_13;
            salary_low140 = job_data[i].salary_low_14;
            salary_low150 = job_data[i].salary_low_15;
            salary_low160 = job_data[i].salary_low_16;
            salary_low170 = job_data[i].salary_low_17;
            salary_low180 = job_data[i].salary_low_18;
            salary_low190 = job_data[i].salary_low_19;
            salary_low200 = job_data[i].salary_low_20;
            salary_high110 = job_data[i].salary_high_11;
            salary_high120 = job_data[i].salary_high_12;
            salary_high130 = job_data[i].salary_high_13;
            salary_high140 = job_data[i].salary_high_14;
            salary_high150 = job_data[i].salary_high_15;
            salary_high160 = job_data[i].salary_high_16;
            salary_high170 = job_data[i].salary_high_17;
            salary_high180 = job_data[i].salary_high_18;
            salary_high190 = job_data[i].salary_high_19;
            salary_high200 = job_data[i].salary_high_20;
        }
    }

    var data = google.visualization.arrayToDataTable([
        ['Job', 'Salary Low', 'Salary High'],
        [job_11, salary_low11, salary_high11],
        [job_22, salary_low22, salary_high22],
        [job_33, salary_low33, salary_high33],
        [job_44, salary_low44, salary_high44],
        [job_55, salary_low55, salary_high55],
        [job_66, salary_low66, salary_high66],
        [job_77, salary_low77, salary_high77],
        [job_88, salary_low88, salary_high88],
        [job_99, salary_low99, salary_high99],
        [job_10, salary_low10, salary_high10],
        [job_110, salary_low110, salary_high110],
        [job_120, salary_low120, salary_high120],
        [job_130, salary_low130, salary_high130],
        [job_140, salary_low140, salary_high140],
        [job_150, salary_low150, salary_high150],
        [job_160, salary_low160, salary_high160],
        [job_170, salary_low170, salary_high170],
        [job_180, salary_low180, salary_high180],
        [job_190, salary_low190, salary_high190],
        [job_200, salary_low200, salary_high200]
    ]);

    var options = {
        title: 'Salaries of Data Science Jobs by Category',
        hAxis: {title: 'Job Title', slantedText: true, slantedTextAngle: 45},
        vAxis: {title: 'Salary (in Thousands $USD)'},
        width: 1200,
        height: 900,
        isStacked: true,
        colors: ['#102542', '#f87060']
    };

    var chart = new google.visualization.ColumnChart(document.getElementById("salary-by-category"));
    chart.draw(data, options);
} //popular job titles in each category

