import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./css/generalStats.css";
import Radar from 'react-d3-radar';

// The RandomSpotlight Component defines everything on the random-pokemon page.
// Here we use the API to get information on two randomly chosen pokemons
// and use that data to compare their base-stats on a Radar Chart.

// We utilise the sub library react-d3-radar - which allows us to create a radar chart.

function RandomSpotlight() {    
  
    // Creating several useState hooks to store the data of the First pokemon
    const [pokemonName1, setPokemonName1] = useState("");
    const [pokemonImage1, setPokemonImage1] = useState("");
    var [pokemonBaseStats1, setPokemonBaseStats1] = useState("");
    const [pokemonType1, setPokemonType1] = useState("");
    const [pokemonHeight1, setPokemonHeight1] = useState("");
    const [pokemonWeight1, setPokemonWeight1] = useState("");

    // Creating several useState hooks to store the data of the Second pokemon
    const [pokemonName2, setPokemonName2] = useState("");
    const [pokemonImage2, setPokemonImage2] = useState("");
    var [pokemonBaseStats2, setPokemonBaseStats2] = useState("");
    const [pokemonType2, setPokemonType2] = useState("");
    const [pokemonHeight2, setPokemonHeight2] = useState("");
    const [pokemonWeight2, setPokemonWeight2] = useState("");

    useEffect(() => {
        async function fetchRandomPokemonData() {

            // Creating two random id's ranging from 0 - 1000
            const randomId = Math.floor(Math.random() * 1000) + 1;
            const randomId2 = Math.floor(Math.random() * 1000) + 1;

            // Getting Pokemon 1 Random Data
            const pokemonResponse = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${randomId}`
            );
            const pokemonData = await pokemonResponse.json();
            setPokemonName1(pokemonData.name.toUpperCase());
            setPokemonImage1(pokemonData.sprites.front_default);
            const baseStats1 = pokemonData.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
            }));
            setPokemonBaseStats1(baseStats1);
            const types1 = pokemonData.types.map((type) => type.type.name);
            setPokemonType1(types1.join(", "));
            setPokemonHeight1(pokemonData.height);
            setPokemonWeight1(pokemonData.weight);

            // Getting Pokemon 2 Random Data

            const pokemonResponse2 = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${randomId2}`
            );
            const pokemonData2 = await pokemonResponse2.json();
            setPokemonName2(pokemonData2.name.toUpperCase());
            setPokemonImage2(pokemonData2.sprites.front_default);
            const baseStats2 = pokemonData2.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
            }));
            setPokemonBaseStats2(baseStats2);
            const types2 = pokemonData2.types.map((type) => type.type.name);
            setPokemonType2(types2.join(", "));
            setPokemonHeight2(pokemonData2.height);
            setPokemonWeight2(pokemonData2.weight);
        }
        fetchRandomPokemonData();
    }, []);

    return (
        <div style={{ marginTop: "15px" }}>
            {/* <h4>
                {pokemonName1} VS {pokemonName2}
            </h4> */}
            <div
    style={{
        display: "flex",
        marginTop: "15px",
        alignItems: "center",
        justifyContent: "center",
    }}>   
    <p>{pokemonBaseStats1.hp}</p>
    <Card style={{ textAlign: "center", minWidth: "300px" }}>
        <Card.Body>
            <Card.Title style={{ fontSize: "30px" }}>
                {pokemonName1}
            </Card.Title>
            <img src={pokemonImage1} />
            <Card.Text>
                <p>Type: {pokemonType1}</p>
                <p>Height: {pokemonHeight1}</p>
                <p>Weight: {pokemonWeight1}</p>
            </Card.Text>
        </Card.Body>
    </Card>
    <h1 style={{ marginTop: "0", marginRight: "25px", marginLeft: "25px" }}>
        VS
    </h1>
    <Card style={{ textAlign: "center", minWidth: "300px" }}>
        <Card.Body>
            <Card.Title style={{ fontSize: "30px" }}>
                {pokemonName2}
            </Card.Title>
            <img src={pokemonImage2} />
            <Card.Text>
                <p>Type: {pokemonType2}</p>
                <p>Height: {pokemonHeight2}</p>
                <p>Weight: {pokemonWeight2}</p>
            </Card.Text>
        </Card.Body>
    </Card>
</div>
<div style={{
        display: "flex",
        marginTop: "15px",
        alignItems: "center",
        justifyContent: "center",
    }}>
<div style={{ marginTop: "-65px", width: "800px", height: "800px" }}>
  {pokemonBaseStats1 && pokemonBaseStats2 ? (
    // This Radar componenet takes in key information inorder to curate the Radar Chart
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
  ) : (
    <p>Loading</p>
  )}
</div>
</div>

</div>

    
    );
}
export default RandomSpotlight;
