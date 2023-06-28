import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "./css/generalStats.css";

// This page does not incorporate D3.js - but is neccessary for completing the dashboard page.

function GeneralStats() {
    // Create hooks to define and set various data pulled from the pokemon api
    const [totalPokemon, setTotalPokemon] = useState(0);
    const [numTypes, setNumTypes] = useState(0);
    const [abiltiesCount, setNumAbilities] = useState(0);
    const [numLocations, setNumLocations] = useState(0);
    const [pokeBalls, setPokeBalls] = useState(0);

    // This useEffect function allows for the calling of API
    useEffect(() => {
        async function fetchData() {
            // API call to get total Pokemon Count
            fetch("https://pokeapi.co/api/v2/pokemon-species/")
                .then((response) => response.json())
                .then((data) => setTotalPokemon(data.count))
                .catch((error) => console.log(error));

            // API Call to get all types and their count
            fetch("https://pokeapi.co/api/v2/type")
                .then((response) => response.json())
                .then((data) => setNumTypes(data.results.length));

            // API Call to get abilities and count
            const response3 = await fetch("https://pokeapi.co/api/v2/ability");
            const abilitiesData = await response3.json();
            setNumAbilities(abilitiesData.count);

            // API Call to get locations and count
            fetch("https://pokeapi.co/api/v2/location")
                .then((response) => response.json())
                .then((data) => setNumLocations(data.count));
        }
        fetchData();

        // ASYNC function to fetch the Standard + Special Pokemon Balls and thier count
        async function fetchPokeballs() {
            const response = await fetch(
                "https://pokeapi.co/api/v2/item-category/34/"
            );
            const data = await response.json();

            const response2 = await fetch(
                "https://pokeapi.co/api/v2/item-category/33/"
            );
            const data2 = await response2.json();

            const x = (await data) + data2;
            setPokeBalls(x);
        }

        fetchPokeballs();
    }, []);

    // Defining the return of the component, we simply build cards and display the fetched data
    // within them.

    return (
        <div style={{ marginTop: "15px" }}>
            <h4>Insights</h4>
            <div style={{ display: "flex", marginTop: "15px" }}>
                <Card style={{ textAlign: "center", minWidth: "200px" }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: "30px" }}>
                            {totalPokemon}
                        </Card.Title>
                        <Card.Text>Unique Pokémon</Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        textAlign: "center",
                        minWidth: "200px",
                        marginLeft: "12px",
                    }}
                >
                    <Card.Body>
                        <Card.Title style={{ fontSize: "30px" }}>
                            {numTypes - 2}
                        </Card.Title>
                        <Card.Text>Different Types</Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        textAlign: "center",
                        minWidth: "200px",
                        marginLeft: "12px",
                    }}
                >
                    <Card.Body>
                        <Card.Title style={{ fontSize: "30px" }}>
                            {abiltiesCount}
                        </Card.Title>
                        <Card.Text>Abilties</Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        textAlign: "center",
                        minWidth: "200px",
                        marginLeft: "12px",
                    }}
                >
                    <Card.Body>
                        <Card.Title style={{ fontSize: "30px" }}>
                            {numLocations}
                        </Card.Title>
                        <Card.Text>Locations to explore</Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        textAlign: "center",
                        minWidth: "200px",
                        marginLeft: "12px",
                    }}
                >
                    <Card.Body>
                        <Card.Title style={{ fontSize: "30px" }}>
                            122
                        </Card.Title>
                        <Card.Text>Games</Card.Text>
                    </Card.Body>
                </Card>
                <Card
                    style={{
                        textAlign: "center",
                        minWidth: "200px",
                        marginLeft: "12px",
                    }}
                >
                    <Card.Body>
                        <Card.Title style={{ fontSize: "30px" }}>
                            {pokeBalls.length}
                        </Card.Title>
                        <Card.Text>Standard + Special Pokéballs</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
export default GeneralStats;
