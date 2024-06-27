import axios from "axios";
import {useContext} from "react";
import {AppContext} from "../providers/AppContext";

export default function useProjectManager() {
    const {projects, setProjects} = useContext(AppContext);

    const getProjects = async () => {
        const res = await axios.get('/api/projects');
        setProjects(res.data);
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

    return {
        projects,
        getProjects,
        createProject,
        deleteProject,
        updateProject
    };
}