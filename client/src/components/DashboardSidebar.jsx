import React from "react";

import "../style/css/DashboardSidebar.css";
import MapsList from "./MapsList";

export default function DashboardSidebar() {
    return (
        <div className={"dashboard-sidebar"}>
            <MapsList/>
        </div>
    )
}