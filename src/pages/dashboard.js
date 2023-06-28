import React from "react";
import CustomSidebar from "../components/CustomSidebar";
import { ProSidebarProvider } from "react-pro-sidebar";
import TypeBarChart from "../components/TypeBarChart";
import GeneralStats from "../components/GeneralStats";
import "./css/dashboard.css";
import CaughtPieChart from "../components/CaughtPieChart";

// Page 1: Dashboard.
// Here we define the componenets that go on this page

function Dashboard() {
    return (
        // Adding the sidebar (which should be shown on each page.)
        // Also adding the sub-components (general stats, typebarchart and caughtpierchart)
        <ProSidebarProvider>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 4fr" }}>
                <CustomSidebar />
                <div style={{ textAlign: "left" }}>
                    <h2 style={{ left: "0", marginTop: "30px" }}>Dashboard</h2>
                    <GeneralStats></GeneralStats>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            marginTop: "25px",
                        }}
                    >
                        <TypeBarChart></TypeBarChart>
                        <CaughtPieChart
                            data={[
                                { label: "Caught", value: 50 },
                                { label: "Uncaught", value: 10 },
                                { label: "Undiscovered", value: 40 },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </ProSidebarProvider>
    );
}

export default Dashboard;
