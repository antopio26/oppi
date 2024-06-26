import "../style/css/Dashboard.css";

import React from 'react';
import Sidebar from "../components/Sidebar";
import DashboardSidebar from "../components/DashboardSidebar";
import ProjectCard from "../components/ProjectCard";
import {NewProjectButton} from "../components/NewProjectButton";

export default function Dashboard() {
    return (
        <>
            <Sidebar>
                <DashboardSidebar/>
            </Sidebar>
            <main className={"dashboard-main"}>
                <div className="projects-list">
                    <div className="projects-list-top">
                        <h1>Projects</h1>
                        <NewProjectButton/>
                    </div>
                    {[1, 2, 3, 4].map((project, i) => (
                        <ProjectCard key={i} project={project}/>
                    ))
                    }
                </div>
            </main>
        </>

    )
}