import {useContext} from "react";
import {AppContext} from "../providers/AppContext";
import axios from "axios";

export default function useMapManager() {
    const {selectedProject, setSelectedProject, projects, setProjects, maps, setMaps} = useContext(AppContext);
    const loadMaps = async () => {
        const response = await axios.get(`/api/maps`);
        setMaps(response.data);
    }
    return {
        loadMaps
    }
}