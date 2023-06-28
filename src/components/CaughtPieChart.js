import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// The CaughtPieChart component takes a parameter called Data, which is the 
// actual data that will be displayed on the pie chart.

function CaughtPieChart({ data }) {
  // Creating a reference to the DOM chart element to call when we receive data from componenet call
  const chartRef = useRef(null);

  // This Hook defines the logic for creating the pie chart, this will run if there is any change in data.
  useEffect(() => {

    // Setting the previously created SVG element and its width, height, radius
    const svg = d3.select(chartRef.current);
    const width = parseInt(svg.attr("width"), 10);
    const height = parseInt(svg.attr("height"), 10);
    const radius = Math.min(width, height) / 2;

    // Creating the group element to contain the whole chart
    const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);
    
    // Defining the color range for the pie chart
    const color = d3.scaleOrdinal().range(["#68886e", "#88686f", "#7b6888"]);

    // Using the D3.pie function to create a layout for our graph, each item in d will be used to set value in this chart
    const pie = d3.pie().value((d) => d.value);

    // Defining the points where the chart is cut off
    const path = d3.arc().outerRadius(radius - 10).innerRadius(0);

    // Defining where labels on the chart will be placed
    const label = d3.arc().outerRadius(radius - 70).innerRadius(radius - 70);

    //Defining an element for the arc positions on the pie chart
    const arcs = g.selectAll(".arc").data(pie(data)).enter().append("g").attr("class", "arc");
    arcs
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.label))
      .append("title")
      .text((d) => d.data.label);

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${label.centroid(d)})`)
      .attr("dy", "0.35em")
      .text((d) => d.data.label + " " + d.data.value + "%")
      .style("text-anchor", "middle")
      .style("font-size", "10px")
      .style("fill", "white");

  }, [data]);

  return (
    <div style={{marginTop: "-40px"}}>
      <h4>Your Progress</h4>
      <svg ref={chartRef} width={400} height={400} style={{marginTop:"50px"}}></svg>
    </div>
  );
}

export default CaughtPieChart;

