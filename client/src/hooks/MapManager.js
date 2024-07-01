import {useContext, useRef, useState} from "react";
import {AppContext} from "../providers/AppContext";
import axios from "axios";

export default function useMapManager() {
    const {maps, setMaps, projects, setProjects, selectedProject, setSelectedProject} = useContext(AppContext);
    const getMaps = async () => {
        const res = await axios.get(`/api/maps`);
        setMaps(res.data);
    }

    const uploadMap = async (file, name, onProgress) => {
        let formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        const res = await axios.post('/api/maps', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) {
                    onProgress(percentCompleted);
                }
            }
        });

        // Assuming `maps` is part of the component's state
        setMaps((prevMaps) => [...prevMaps, res.data]);
    };

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