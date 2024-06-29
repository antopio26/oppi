import axios from "axios";
import {useContext, useState} from "react";
import {AppContext} from "../providers/AppContext";

export default function useProjectManager() {
    const {projects, setProjects, selectedProject, setSelectedProject} = useContext(AppContext);

    const getProjects = async () => {
        const res = await axios.get('/api/projects');

        setProjects(res.data);

        if (!selectedProject && res.data.length > 0) {
            setSelectedProject(
                res.data.sort((a, b) => new Date(b.lastOpenAt) - new Date(a.lastOpenAt))[0]
            );
        }
    }

    const createProject = async (project) => {
        const res = await axios.post('/api/projects', project);
        setProjects([...projects, res.data]);
    }

    const deleteProject = async (id) => {
        await axios.delete(`/api/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));
    }

    const updateProject = async (id, project) => {
        const res = await axios.put(`/api/projects/${id}`, project);
        setProjects(projects.map(p => p._id === id ? res.data : p));
    }

    const updateParameters = async (id, parameters) => {
        const res = await axios.put(`/api/projects/${id}/parameters`, parameters);
        setProjects(projects.map(p => p._id === id ? res.data : p));

        setSelectedProject(res.data);
    }

    const updateLastOpenAt = async (id) => {
        const res = await axios.put(`/api/projects/${id}/lastOpenAt`, {});
        setProjects(projects.map(p => p._id === id ? res.data : p));

        setSelectedProject(res.data);
    }

    return {
        getProjects,
        createProject,
        deleteProject,
        updateProject,
        updateParameters,
        updateLastOpenAt
    };
}