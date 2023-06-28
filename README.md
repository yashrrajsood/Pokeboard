
Note: This project was completed by Yash Raj Sood as part of a Master's degree at the University of Auckland. The original repository is private and could not be cloned, so this repository was reinitialized.

![main-logo](https://user-images.githubusercontent.com/42294625/230892562-23262050-7a94-4cc5-9df1-57d6e612e67b.png)


# Pokéboard

Pokéboard is a web application that utilises powerful visualisations provided by the D3.js library to help people visualize and analyze Pokémon data.


## Introduction

Pokéboard is a web application built using D3.js and React to visualize and analyze Pokémon data. The dashboard consists of two pages:

Dashboard page: Displays general data on Pokémon, a bar chart showing the number of Pokémon by type, and a pie chart showing the distribution of a users - caught, undiscovered, and uncaught Pokémon.

Pokémon vs Pokémon page: Displays a radar chart comparing the base stats of two random Pokémon.
## Features

- Displays Pokémon data in an intuitive and visually appealing way.
- Provides interactive charts to visualize and analyze Pokémon data.
- Allows users to compare the base stats of two random Pokémon.


## Running The Demo

If you are simply running the above code, you can start the node server by typing in

```
npm run start
```
in your command line of choice (please make sure the CD is set correctly)
## Getting Started

#### Knowledge Required

- JavaScript
- React (+ routing)
- Bootstrap
- HTML/CSS
- API's (pokeapi)
- GIT

#### Knowledge Gained [CORE]

- D3.js

#### Knowledge Gained [SUPPLEMENTARY]

- react-pro-sidebar
- create-react-app

#### Prerequisites

- Node.js
- npm

### 1) Install the necessary tools

Before getting started with this project, please make sure you have Node.js and NPM on your machine.

NODE: You can do so with 

```
node -v
```

NPM: You can do so with 

```
npm -v
```

If the respective is installed, a version number will be displayed.

### 2) Set up the project

Once you have installed the necessary tools, you can start to set up a react project. Do so using create-react-app.

Open up your terminal and navigate to the directory where you want to create your project. Then, run the following command:

```
npx create-react-app pokemon-D3
```

This will create a new React app named "pokemon-d3" in a new directory.

Once you have set up a react project, you will need to install the dependencies. The only necessary dependencies are

- d3
- react
- react-dom
- react-d3-radar

These are optional dependencies you can install inorder to create an exact replica:

- react-router-dom
    - If you would like dynamic routing 
- react-pro-sidebar
    - If you would like a fancy sidebar :)
- bootstrap & react-bootstrap
    - If you would like fancy cards

Your command should look something like this, if youre installing all:

```
npm install --save react react-dom react-router-dom d3 react-d3-radar react-pro-sidebar bootstrap react-bootstrap

```

This will install all dependencies needed (+ not needed) for this app

Next, you will have to set up the structure of the app a little bit. 

Please make sure you have an app that has a similar structure to this.

```
pokemon-d3/
  README.md
  node_modules/
  package.json
  package-lock.json
  .gitignore
  public/
    index.html
    favicon.ico
  src/
    App.js
    App.css
    index.js
    index.css
    components/
      CaughtPieChart.js
      RandomSpotlight.js 
      TypeBarChart.js 
      CustomSidebar.js (OPTIONAL)
      GeneralStats.js (OPTIONAL)
    pages/ 
      dashboard.js
      random-pokemon.js
```


## Tech

**D3.js**

D3.js, which stands for Data-Driven Documents, is a JavaScript library used for creating dynamic and interactive visualizations in web browsers. It provides a set of powerful tools for data manipulation, data visualization, and animation.

D3.js is not a charting library like Chart.js or Google Charts; it is a lower-level library that gives you more control over your visualizations. With D3, you can create custom charts and visualizations that meet your specific needs.

D3.js uses scalable vector graphics (SVG), a vector image format that allows for smooth, responsive, and interactive graphics. SVG images are defined in XML format, and D3.js makes it easy to generate and manipulate SVG elements using JavaScript.

One of the most powerful features of D3.js is its data-binding capabilities. You can bind data to visual elements in your visualization, which allows you to create dynamic and responsive visualizations that update in real-time as your data changes.

Overall, D3.js is a powerful tool for creating custom, data-driven visualizations on the web, and it has a steep learning curve but it is worth it if you are looking for full control and customization over your visualizations.

**react-d3-radar**

Supplementary library for D3.js which has the set-up for radar charts, built specifically for React apps.


## Component + Page Breakdown [to D3.js]

### Dashboard Page (dashboard.js)

This page has two main components that utilize D3.js - TypeBarChart.js & CaughtPieChart.js

#### TypeBarChart.js

This code defines a React component called TypeBarChart, which uses D3.js library to create a bar chart that displays the count of different types of Pokemon. The component fetches data from the pokeapi, loops through the data to get the count for each type, and creates a Scalable Vector Graphic (SVG) to render the chart.

The SVG is defined and selected here, the chartRef was defined as a hook:

```
const svg = d3.select(chartRef.current);
```

The code defines scales for the x and y axes, sets their domains and ranges, and adds the axes to the chart. It also defines the color of the bars and adds the bars and their labels to the chart. This is done by so:

```
const x = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.2)
  .domain(Object.keys(typeCount));

const x = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.2)
  .domain(Object.keys(typeCount));

```

The axis of the bar chart were created by:

```
g.append("g")
  .attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

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

```

The axisBottom() and axisLeft() functions are used to create the bottom and left axes respectively and the call() function is used to call the axis functions on the selected element. Everything after adds attributes to the axis bottom and left.

The bars of the chart are created by:

```
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

```

These lines create the actual bar chart. The selectAll() function is used to select all the rectangular (bars) elements, which are then bound to the data using the data() method.

#### CaughtPieChart.js

This code defines a React component called CaughtPieChart, which uses D3.js library to create a pie chart that displays user stats. A Scalable Vector Graphic (SVG) is used to render the chart with the help of D3.js.

The SVG element is set-up and defined using:

```
const svg = d3.select(chartRef.current);
const width = parseInt(svg.attr("width"), 10);
const height = parseInt(svg.attr("height"), 10);
const radius = Math.min(width, height) / 2;
```

Then, the grouping (where all the indvidual elements of a graph go) is created and populated through these basica functions:

```
const g = svg.append("g").attr("transform", `translate(${width / 2},${height / 2})`);
const color = d3.scaleOrdinal().range(["#68886e", "#88686f", "#7b6888"]);
const pie = d3.pie().value((d) => d.value);
const path = d3.arc().outerRadius(radius - 10).innerRadius(0);
const label = d3.arc().outerRadius(radius - 70).innerRadius(radius - 70);
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
```


### Pokemon vs Pokemon Page (random-pokemon.js)

#### RandomSpotlight.js

This code defines a React component called RandomSpotlight, which uses D3.js library and the helper library react-d3-radar to create a Radar graph.

The component first sets up the state variables for storing the data of the first and second Pokemon:

```
const [pokemonName1, setPokemonName1] = useState("");
const [pokemonImage1, setPokemonImage1] = useState("");
var [pokemonBaseStats1, setPokemonBaseStats1] = useState("");
const [pokemonType1, setPokemonType1] = useState("");
const [pokemonHeight1, setPokemonHeight1] = useState("");
const [pokemonWeight1, setPokemonWeight1] = useState("");

const [pokemonName2, setPokemonName2] = useState("");
const [pokemonImage2, setPokemonImage2] = useState("");
var [pokemonBaseStats2, setPokemonBaseStats2] = useState("");
const [pokemonType2, setPokemonType2] = useState("");
const [pokemonHeight2, setPokemonHeight2] = useState("");
const [pokemonWeight2, setPokemonWeight2] = useState("");
```

The Radar chart is generated using the Radar component from the react-d3-radar library, which takes in the base stats of both Pokemon. The chart is then customized using props such as dotColor, dotBorderColor, dotBorderWidth, gridShape, and colors and other settings to make the graph look nice.

```
<Radar
      width={300}
      height={300}
      padding={70}
      domainMax={200}
      highlighted={null}
    // Here we define the labels and keys for the data that will be fed into the chart
      data={{
        variables: [
          { key: "hp", label: "HP" },
          { key: "attack", label: "ATK" },
          { key: "defense", label: "DEF" },
          { key: "special-attack", label: "SP ATK" },
          { key: "special-defense", label: "SP DEF" },
          { key: "speed", label: "SPEED" },
        ],
        // Defining the set of data that will be used in the chart
        sets: [
          {
            key: pokemonName1,
            label: pokemonName1,
            values: pokemonBaseStats1.reduce(
              (obj, item) => ((obj[item.name] = item.value), obj),
              {}
            ),
          },
          {
            key: pokemonName2,
            label: pokemonName2,
            values: pokemonBaseStats2.reduce(
              (obj, item) => ((obj[item.name] = item.value), obj),
              {}
            ),
          },
        ],
      }}
    />
```

The width and the height are the first attributes set up for the radar graph, along with the padding. The domainMax defines the max value for the domain of the base stats, in this case its set to 200.

The data attribute defines the links the keys to the labels. So when the data is inserted into "sets" the Radar component knows which data to link to which label.






## Documentation

[react](https://react.dev/)

[d3.js](https://github.com/d3/d3/wiki)

[react-d3-radar](https://www.npmjs.com/package/react-d3-radar)



## License

[MIT](https://choosealicense.com/licenses/mit/)

