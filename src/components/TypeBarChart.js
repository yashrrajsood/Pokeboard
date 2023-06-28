import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

// The TypeBarChart Component incorporates the first D3.js function. Creating a Bar Chart.

function TypeBarChart() {
  // Creating a reference to the DOM chart element to call when we receive data from API
  const chartRef = useRef(null);

  // Use Effect allowing for API Call + defining chart 
  useEffect(() => {
    async function fetchTypeCount() {
      
      // Call API for types of Pokemon
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const data = await response.json();

      // Using the above data to loop and call another API to get count for each respective type
      const typeCount = {};
      for (let type of data.results) {
        const typeResponse = await fetch(type.url);
        const typeData = await typeResponse.json();
        typeCount[type.name] = typeData.pokemon.length;
      }

      // Creating the Scalable Vector Graphic (SVG) to faciliate rendering the chart
      const svg = d3.select(chartRef.current);

      // Defining SVG margin, width and height ()
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const widthAttr = svg.attr("width");
      const heightAttr = svg.attr("height");
      const width = parseInt(widthAttr) - margin.left - margin.right;
      const height = parseInt(heightAttr) - margin.top - margin.bottom;

      // Defining a Scale Band for the x axis, setting its range to 0-width with a padding of 0
      // and setting the domain to be the diffeent types of Pokemon (labels on the x axis)
      const x = d3
        .scaleBand()
        .rangeRound([0, width])
        .padding(0.2) 
        .domain(Object.keys(typeCount));

      // Defining a Scale linear for the y axis, setting its range to height-0 with a domain of 
      // y values ranging from 0 to the Type (COUNT)
      const y = d3
        .scaleLinear()
        .rangeRound([height, 0])
        .domain([0, d3.max(Object.values(typeCount))]);

      // 'g' is the SVG that will contain all the different parts of the graph (eg. bar, labels etc.)
      const g = svg
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Defining the color of the bars
      const color = d3.scaleOrdinal()
        .domain(Object.keys(typeCount))
        .range(["#544595"]); 

      // Adding the x axis defined above and transforming its position to be placed at the bottom of the chart
      g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Adding the y axis defined above and transforming its position to be placed at the side of the chart. Also adding a label to show the y-axis
      g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "s"))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Count");

      // Adding the "bars" to the grouping, while defining the other attributes added above
      g.selectAll(".bar")
        .data(Object.entries(typeCount))
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d[0]))
        .attr("y", (d) => y(d[1]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(d[1]))
        .style("fill", (d) => color(d[0]))
        .append("title")
        .text((d) => d[1]); 

      // Adding all bar based text to the grouping, this text appears above the bar.
      g.selectAll(".text")
        .data(Object.entries(typeCount))
        .enter()
        .append("text")
        .attr("class", "text")
        .attr("x", (d) => x(d[0]) + x.bandwidth() / 2)
        .attr("y", (d) => y(d[1]) - 5)
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .text((d) => d[1]);
    }
    fetchTypeCount();

  }, []);

  return <div style={{marginTop: '15px'}}>
    <h4>Types of Pokemon</h4>
    <svg ref={chartRef} width={900} height={500}></svg>
    </div>;
}
export default TypeBarChart;
