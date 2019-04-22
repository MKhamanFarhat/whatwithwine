//Read the data
d3.csv("csv/IVPDatasetWinery.csv", function (data) {

    // set the dimensions and margins of the graph
    var margin = { top: 80, right: 40, bottom: 80, left: 110 },
        width = 1250 - margin.left - margin.right,
        height = 550 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#wineryBar")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Add X axis
    var x = d3.scaleBand()
        .domain(data.map(function (d) { return d.iso; }))
        .range([0, width])
        .padding(10);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    // Y axis
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 6000])
    svg.append("g")
        .call(d3.axisLeft(y))

    // Lines
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
        .attr("x1", function (d) { return x(d.iso); })
        .attr("x2", function (d) { return x(d.iso); })
        .attr("y1", function (d) { return y(d.winery_count); })
        .attr("y2", y(0))
        .attr("stroke", "grey")

    // Hover function
    var mouseover = function (d) {
        // Reduce opacity of all rect to 0.2
        d3.select(this)
            .transition()
            .duration(100)
            .attr('r', '14')

        svg.append("text")
            .transition()
            .duration(200)
            .attr("class", "hover-label")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .text("Winery Count : " + d.winery_count);
    }

    // Remove hover
    var mouseleave = function (d) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('r', '7')
        svg.selectAll('.hover-label').remove()
    }

    // Circles
    svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.iso); })
        .attr("cy", function (d) { return y(d.winery_count); })
        .attr("r", "7")
        .style("fill", "#69b3a2")
        .attr("stroke", "black")
        .on("mouseover", mouseover)
        .on("mouseleave", mouseleave)
})

svg.append("text")
    .attr("x", 55)
    .attr("y", -height / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .style("writing-mode", "tb-rl")
    .style("transform", "rotate(-180deg)")
    .text("Winery Count");

svg.append("text")
    .attr("x", (width) / 2)
    .attr("y", height + 35)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Country");