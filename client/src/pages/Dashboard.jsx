import "../style/css/Dashboard.css";
import "../style/css/DashboardSidebar.css";

import React, {useContext, useEffect, useState} from 'react';
import Sidebar from "../components/Sidebar";
import {AppContext} from "../providers/AppContext";
import MapsList from "../components/MapsList";
import ProjectList from "../components/ProjectList";
import useMapManager from "../hooks/MapManager";
import useProjectManager from "../hooks/ProjectManager";

export default function Dashboard() {
    const [mapFilter, setMapFilter] = useState([]);
    const {projects, maps} = useContext(AppContext);
    const {deleteMap} = useMapManager();

    const handleToggleMapFilter = (mapId) => {
            if (mapFilter.includes(mapId)) {
                setMapFilter(mapFilter.filter((id) => id !== mapId));
            } else {
                setMapFilter([...mapFilter, mapId]);
            }
    }

    const handleResetMapFilter = () => {
        document.querySelectorAll("input[name='map']:checked").forEach((input) => {
            input.checked = false;
        });
        setMapFilter([]);
    }

    const handleRemoveMap = async (mapId) => {
        await deleteMap(mapId);
        setMapFilter(mapFilter.filter((id) => id !== mapId));
    }

    const getMapFilter = () => mapFilter;

    return (
        <>
            <Sidebar>
                <div className={"dashboard-sidebar"}>
                    <MapsList maps={maps} onToggle={handleToggleMapFilter} onReset={handleResetMapFilter} onRemove={handleRemoveMap} getMapFilter={getMapFilter}/>
                </div>
            </Sidebar>
            <main className={"dashboard-main"}>
                <ProjectList projects={projects.filter(project => mapFilter.length === 0 || mapFilter.includes(project.map))}/>
            </main>
        </>

    )
}