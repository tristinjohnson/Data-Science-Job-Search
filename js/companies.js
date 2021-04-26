//---------------- Top Companies Graph ----------------

var margin = {left: 80, right: 20, top: 50, bottom: 100};

var width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left, + margin.right)
        .attr("height", height + margin.top + margin.bottom + 100)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

//tooltip
var tip = d3.tip().attr("class", "d3-tip")
    .html(function(d){
        var text = "<strong>Company:</strong> <span style='color:#8ecae6'>" + d.company + "</span><br>";
        text += "<strong>Job Count:</strong> <span style='color:#8ecae6'>" + d.job_count + "</span><br>";
        return text;
    });
svg.call(tip);

//xlabel
svg.append("text")
    .attr("y", height + 140)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Company");

//y label
var yLabel = svg.append("text")
    .attr("y", -60)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Job Count");

//title
svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "21px")
    .text("Top 15 Companies with Greatest Number of Job Postings");


//read in the data
d3.json("data/companyTotal.json").then(function(data){
    //clean the data
    data.forEach(function(d){
        d.job_count = +d.job_count;
    })

    //x scale
    var x = d3.scaleBand()
        .domain(data.map(function(d){ return d.company; }))
        .range([0, width])
        .padding(0.2);

    //y scale
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){ return d.job_count; })])
        .range([height, 0]);

    //x axis
    var xAxis = d3.axisBottom(x);

    //color scale
    var color = d3.scaleOrdinal()
        .range(["#1d3557", '#1d3557','#1d3557', '#457b9d', '#457b9d', '#457b9d', '#a8dadc', '#a8dadc', '#a8dadc', '#e63946', '#e63946', '#e63946', '#e63946', '#e63946', '#e63946']);

    //rotate x-labels
    svg.append("g")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxis)
        .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-45)")
            .attr("font-size", "11px");

    //y axis
    var yAxis = d3.axisLeft(y)
        .tickFormat(function(d){ return d; });

    svg.append("g")
        .call(yAxis);

    //create rects
    var rects = svg.selectAll("rect")
        .data(data);

    //enter the rects
    rects.enter()
        .append("rect")
            .attr("y", function(d, i){ return y(d.job_count); })
            .attr("x", function(d, i){ return x(d.company); })
            .attr("height", function(d, i){ return height - y(d.job_count); })
            .attr("width", x.bandwidth)
            .attr("fill", function(d){ return color(d.job_count); })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide);
});


//---------------- IBM Entry Level vs. Senior Level ----------------

var margin1 = {left1: 160, right1: 100, top1: 50, bottom1: 100};
var width1 = 450, height1=350;

var svg1 = d3.select("#new-chart")
    .append("svg")
        .attr("width", width1 + margin1.left1 + margin1.right1)
        .attr("height", height1 + margin1.top1 + margin1.bottom1 + 100)
    .append("g")
        .attr("transform", "translate(" + margin1.left1 + ", " + margin1.top1 + ")");

//tooltip
var tip1 = d3.tip().attr("class", "d3-tip")
        .html(function(d){
            var text1 = "<strong>Job Title:</strong> <span style='color:#8ecae6'>" + d.Job_Title + "</span><br>";
            text1 += "<strong>Salary Low: $</strong> <span style='color:#8ecae6'>" + d.Low + ",000</span><br>";
            text1 += "<strong>Salary High: $</strong> <span style='color:#8ecae6'>" + d.High + ",000</span><br>";
            return text1;
        });
svg1.call(tip1);

//title
svg1.append("text")
    .attr("x", (width1 / 2))
    .attr("y", 0 - (margin1.top1 / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "25px")
    .text("IBM Data Science Jobs (Entry Level vs. Senior Level)");

//xlabel
svg1.append("text")
    .attr("y", height1 + 80)
    .attr("x", width1 / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Salary (in Thousands $)");

//read in the data
d3.json("data/ibm.json").then(function(data1){
    //clean the data
    data1.forEach(function(d){
        d.High = +d.High;
        d.Low = +d.Low;
    })

    //x scale
    var x = d3.scaleLinear()
        .domain([0, 270])
        .range([0, width1]);

    svg1.append("g")
        .attr("transform", "translate(0, " + height1 + ")")
        .call(d3.axisBottom(x));

    //y scale
    var y = d3.scaleBand()
        .range([0, height1])
        .domain(data1.map(function(d) { return d.Job_Title; }))
        .padding(1);

    svg1.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
            .attr("transfrom", "rotate(-30)");
        
    //create lines between circles
    svg1.selectAll("myline")
        .data(data1)
        .enter()
        .append("line")
          .attr("x1", function(d) { return x(d.Low); })
          .attr("x2", function(d) { return x(d.High); })
          .attr("y1", function(d) { return y(d.Job_Title); })
          .attr("y2", function(d) { return y(d.Job_Title); })
          .attr("stroke", "grey")
          .attr("stroke-width", "3px")
          .on("mouseover", tip1.show)
          .on("mouseout", tip1.hide);

    //ciricles of low salary
    svg1.selectAll("mycircle")
        .data(data1)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.Low); })
            .attr("cy", function(d) { return y(d.Job_Title); })
            .attr("r", "6")
            .style("fill", "#48cae4");

    //circles of high salary
    svg1.selectAll("mycircle")
        .data(data1)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.High); })
        .attr("cy", function(d) { return y(d.Job_Title); })
        .attr("r", "6")
        .style("fill", "#023e8a");

    //create legend
    svg1.append("circle").attr("cx", 540).attr("cy", 15).attr("r", 6).style("fill", "#48cae4");
    svg1.append("circle").attr("cx", 540).attr("cy", 35).attr("r", 6).style("fill", "#023e8a");
    svg1.append("text").attr("x", 465).attr("y", 20).text("Salary (Low)").style("font-size", "12px");
    svg1.append("text").attr("x", 465).attr("y", 40).text("Salary (High)").style("font-size", "12px");

});


// ---------------- Apple Entery Level vs. Senior Level ----------------

var margin2 = {left2: 160, right2: 100, top2: 50, bottom2: 100};
var width2 = 450, height2=350;

var svg2 = d3.select("#new-chart1")
    .append("svg")
        .attr("width", width2 + margin2.left2 + margin2.right2)
        .attr("height", height2 + margin2.top2 + margin2.bottom2 + 100)
    .append("g")
        .attr("transform", "translate(" + margin2.left2 + ", " + margin2.top2 + ")");

//tooltip
var tip2 = d3.tip().attr("class", "d3-tip")
        .html(function(d){
            var text2 = "<strong>Job Title:</strong> <span style='color:#ced4da'>" + d.Job_Title + "</span><br>";
            text2 += "<strong>Salary (Low): $</strong> <span style='color:#ced4da'>" + d.Low + ",000</span><br>";
            text2 += "<strong>Salary (High): $</strong> <span style='color:#ced4da'>" + d.high + ",000</span><br>";
            return text2;
        });
svg2.call(tip2);

//title
svg2.append("text")
    .attr("x", (width2 / 2))
    .attr("y", 0 - (margin2.top2 / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "25px")
    .text("Apple Data Science Jobs (Entry Level vs. Senior Level)");

//xlabel
svg2.append("text")
    .attr("y", height2 + 80)
    .attr("x", width2 / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Salary (in Thousands $)");

//read in the data
d3.json("data/apple.json").then(function(data2){
    //clean the data
    data2.forEach(function(d){
        d.high = +d.high;
        d.Low = +d.Low;
    })

    //x scale
    var x = d3.scaleLinear()
        .domain([0, 270])
        .range([0, width2]);

    svg2.append("g")
        .attr("transform", "translate(0, " + height2 + ")")
        .call(d3.axisBottom(x));

    //y scale
    var y = d3.scaleBand()
        .range([0, height2])
        .domain(data2.map(function(d) { return d.Job_Title; }))
        .padding(1);

    svg2.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
            .attr("transfrom", "rotate(-30)");
        
    //create lines between circles
    svg2.selectAll("myline")
        .data(data2)
        .enter()
        .append("line")
          .attr("x1", function(d) { return x(d.Low); })
          .attr("x2", function(d) { return x(d.high); })
          .attr("y1", function(d) { return y(d.Job_Title); })
          .attr("y2", function(d) { return y(d.Job_Title); })
          .attr("stroke", "grey")
          .attr("stroke-width", "3px")
          .on("mouseover", tip2.show)
          .on("mouseout", tip2.hide);

    //ciricles of low salary
    svg2.selectAll("mycircle")
        .data(data2)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.Low); })
            .attr("cy", function(d) { return y(d.Job_Title); })
            .attr("r", "6")
            .style("fill", "#adb5bd");

    //circles of high salary
    svg2.selectAll("mycircle")
        .data(data2)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.high); })
        .attr("cy", function(d) { return y(d.Job_Title); })
        .attr("r", "6")
        .style("fill", "#495057");

    //create legend
    svg2.append("circle").attr("cx", 540).attr("cy", 15).attr("r", 6).style("fill", "#adb5bd");
    svg2.append("circle").attr("cx", 540).attr("cy", 35).attr("r", 6).style("fill", "#495057");
    svg2.append("text").attr("x", 465).attr("y", 20).text("Salary (Low)").style("font-size", "12px");
    svg2.append("text").attr("x", 465).attr("y", 40).text("Salary (High)").style("font-size", "12px");

});

//---------------- Amazon Entery Level vs. Senior Level ----------------

var margin3 = {left3: 160, right3: 100, top3: 50, bottom3: 100};
var width3 = 450, height3=350;

var svg3 = d3.select("#new-chart2")
    .append("svg")
        .attr("width", width3 + margin3.left3 + margin3.right3)
        .attr("height", height3 + margin3.top3 + margin3.bottom3 + 100)
    .append("g")
        .attr("transform", "translate(" + margin3.left3 + ", " + margin3.top3 + ")");

//tooltip
var tip3 = d3.tip().attr("class", "d3-tip")
        .html(function(d){
            var text3 = "<strong>Job Title:</strong> <span style='color:#f77f00'>" + d.Job_Title + "</span><br>";
            text3 += "<strong>Salary (Low): $</strong> <span style='color:#f77f00'>" + d.Low + ",000</span><br>";
            text3 += "<strong>Salary (High): $</strong> <span style='color:#f77f00'>" + d.high + ",000</span><br>";
            return text3;
        });
svg3.call(tip3);

//title
svg3.append("text")
    .attr("x", (width3 / 2))
    .attr("y", 0 - (margin3.top3 / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "25px")
    .text("Amazon Data Science Jobs (Entry Level vs. Senior Level)");

//xlabel
svg3.append("text")
    .attr("y", height3 + 80)
    .attr("x", width3 / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Salary (in Thousands $)");

//read in the data
d3.json("data/amazon.json").then(function(data3){
    //clean the data
    data3.forEach(function(d){
        d.high = +d.high;
        d.Low = +d.Low;
    })

    //x scale
    var x = d3.scaleLinear()
        .domain([0, 270])
        .range([0, width3]);

    svg3.append("g")
        .attr("transform", "translate(0, " + height3 + ")")
        .call(d3.axisBottom(x));

    //y scale
    var y = d3.scaleBand()
        .range([0, height3])
        .domain(data3.map(function(d) { return d.Job_Title; }))
        .padding(1);

    svg3.append("g")
        .call(d3.axisLeft(y))
        .selectAll("text")
            .attr("transfrom", "rotate(-30)");
        
    //create lines between circles
    svg3.selectAll("myline")
        .data(data3)
        .enter()
        .append("line")
          .attr("x1", function(d) { return x(d.Low); })
          .attr("x2", function(d) { return x(d.high); })
          .attr("y1", function(d) { return y(d.Job_Title); })
          .attr("y2", function(d) { return y(d.Job_Title); })
          .attr("stroke", "grey")
          .attr("stroke-width", "3px")
          .on("mouseover", tip3.show)
          .on("mouseout", tip3.hide);

    //ciricles of low salary
    svg3.selectAll("mycircle")
        .data(data3)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.Low); })
            .attr("cy", function(d) { return y(d.Job_Title); })
            .attr("r", "6")
            .style("fill", "#f77f00");

    //circles of high salary
    svg3.selectAll("mycircle")
        .data(data3)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.high); })
        .attr("cy", function(d) { return y(d.Job_Title); })
        .attr("r", "6")
        .style("fill", "#003049");

    //create legend
    svg3.append("circle").attr("cx", 540).attr("cy", 15).attr("r", 6).style("fill", "#f77f00");
    svg3.append("circle").attr("cx", 540).attr("cy", 35).attr("r", 6).style("fill", "#003049");
    svg3.append("text").attr("x", 465).attr("y", 20).text("Salary (Low)").style("font-size", "12px");
    svg3.append("text").attr("x", 465).attr("y", 40).text("Salary (High)").style("font-size", "12px");

});

