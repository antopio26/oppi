import React, { useState } from "react";

// import "../style/css/DashboardSidebar.css";

import {NewProjectButton} from "./NewProjectButton";

export default function DashboardSidebar() {
    return (
        <div className={"dashboard-sidebar"}>
            <NewProjectButton/>
        </div>
    )
}