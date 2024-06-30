import {useContext, useState} from "react";
import {AppContext} from "../providers/AppContext";
import axios from "axios";

export default function useMapManager() {
    const {maps, setMaps, projects, setProjects, selectedProject, setSelectedProject} = useContext(AppContext);
    const getMaps = async () => {
        const res = await axios.get(`/api/maps`);
        setMaps(res.data);
    }

    const uploadMap = async (file, name) => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        const res = await axios.post('/api/maps', formData)

        setMaps([...maps, res.data]);
    }

    const deleteMap = async (id) => {
        await axios.delete(`/api/maps/${id}`);
        setMaps(maps.filter(p => p._id !== id));
        setProjects(projects.filter(p => p.map !== id));

        if (selectedProject?._id === id) {
            setSelectedProject(
                projects.sort((a, b) => new Date(b.lastOpenAt) - new Date(a.lastOpenAt))[0]
            );
        }
    }

    return {
        getMaps,
        uploadMap,
        deleteMap
    }
}