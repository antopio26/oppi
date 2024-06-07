import React from 'react';
import Sidebar from "../components/Sidebar";
import DashboardSidebar from "../components/DashboardSidebar";

export default function Dashboard() {
    return (
        <>
            <Sidebar>
                <DashboardSidebar/>
            </Sidebar>
            <main>
                <h1>Dashboard</h1>
            </main>
        </>

    )
}