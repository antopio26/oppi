import "../style/css/Dashboard.css";

import React from 'react';
import Sidebar from "../components/Sidebar";
import DashboardSidebar from "../components/DashboardSidebar";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
    return (
        <>
            <Sidebar>
                <DashboardSidebar/>
            </Sidebar>
            <main className={"dashboard-main"}>
                <div className="projects-list">
                    <h1>Projects</h1>
                    {[1, 2, 3, 4].map((project, i) => (
                        <ProjectCard key={i} project={project}/>
                    ))
                    }
                </div>
            </main>
        </>

    )
}