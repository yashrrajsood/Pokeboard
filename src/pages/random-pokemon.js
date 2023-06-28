import React from "react";
import CustomSidebar from "../components/CustomSidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import "./css/dashboard.css";
import RandomSpotlight from "../components/RandomSpotlight";


// Page 2: Random Pokemon Comparison Page.
// Here we define the componenets that go on this page

function RandomPokemon() {
    // This page contains the two pokemon card and radar chart (defined by RandomSpotlight)
    
    return (
        <ProSidebarProvider>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
                <CustomSidebar />
                <RandomSpotlight></RandomSpotlight>
                {/* <div style={{ textAlign: "left" }}>
                    <h2 style={{ left: "0", marginTop: "30px"}}>Dashboard</h2>
                    <GeneralStats></GeneralStats>
                    <div style={{display: "flex", flexWrap: "wrap", alignItems: "center", marginTop:"25px"}}>
                        <TypeBarChart></TypeBarChart>
                        <CaughtPieChart data={[{ label: "Caught", value: 50 }, { label: "Uncaught", value: 10 }, { label: "Undiscovered", value: 40 }]} />
                    </div>
                </div> */}
            </div>
        </ProSidebarProvider>
    );
}

export default RandomPokemon;
