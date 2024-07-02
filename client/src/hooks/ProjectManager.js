import axios from "axios";
import {useContext} from "react";
import {AppContext} from "../providers/AppContext";

export default function useProjectManager() {
    const {projects, setProjects, selectedProject, setSelectedProject, paths, setPaths, currentPath} = useContext(AppContext);

    const getProjects = async () => {
        const res = await axios.get('/api/projects');

        setProjects(res.data);

        if (!selectedProject && res.data.length > 0) {
            setSelectedProject(
                res.data.sort((a, b) => new Date(b.lastOpenAt) - new Date(a.lastOpenAt))[0]
            );
        }

        return res.data;
    }

    const createProject = async (project) => {
        const res = await axios.post('/api/projects', project);
        setProjects([...projects, res.data]);

        return res.data;
    }

    const deleteProject = async (id) => {
        const res = await axios.delete(`/api/projects/${id}`);
        setProjects(projects.filter(p => p._id !== id));

        if (selectedProject?._id === id) {
            setSelectedProject(
                projects.sort((a, b) => new Date(b.lastOpenAt) - new Date(a.lastOpenAt))[0]
            );
        }

        return res.data;
    }

    const updateProject = async (id, project) => {
        const res = await axios.put(`/api/projects/${id}`, project);
        setProjects(projects.map(p => p._id === id ? res.data : p));

        return res.data;
    }

    const updateParameters = async (id, parameters) => {
        const res = await axios.put(`/api/projects/${id}/parameters`, parameters);
        setProjects(projects.map(p => p._id === id ? res.data : p));

        setSelectedProject(res.data);
        return res.data;
    }

    const updateLastOpenAt = async (id) => {
        const res = await axios.put(`/api/projects/${id}/lastOpenAt`, {});
        setProjects(projects.map(p => p._id === id ? res.data : p));

        setSelectedProject(res.data);

        return res.data;
    }

    const getPaths = async (projectId) => {
        const res = await axios.get(`/api/projects/${projectId}/paths`);
        setPaths(res.data);

        return res.data;
    }

    const createPath = async (projectId, path) => {
        const res = await axios.post(`/api/projects/${projectId}/paths`, path);
        if (res.status===200) {
            setPaths([...paths, res.data]);
            return res.data;
        }else if (res.status===208){
            return currentPath;
        }
        return null;

    }

    const savePath = async (projectId, pathId) => {
        const res = await axios.put(`/api/projects/${projectId}/paths/${pathId}/save`);
        setPaths(paths.map(p => p._id === pathId ? res.data : p));

        return res.data;
    }

    const unsavePath = async (projectId, pathId) => {
        const res = await axios.put(`/api/projects/${projectId}/paths/${pathId}/unsave`);
        setPaths(paths.map(p => p._id === pathId ? res.data : p));

        return res.data;
    }

    return {
        getProjects,
        createProject,
        deleteProject,
        updateProject,
        updateParameters,
        updateLastOpenAt,
        getPaths,
        createPath,
        savePath,
        unsavePath
    };
}