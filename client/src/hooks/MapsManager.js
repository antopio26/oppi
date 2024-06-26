import {useContext} from "react";
import {AppContext} from "../providers/AppContext";
import axios from "axios";

export default function useMapManager() {
    const {maps, setMaps} = useContext(AppContext);

    const loadMaps = async () => {
        const response = await axios.get(`/api/maps`);
        setMaps(response.data);
    }

    const uploadMap = (map) => {
        setMaps([...maps, map]);
    }

    return {
        loadMaps,
        uploadMap
    }
}