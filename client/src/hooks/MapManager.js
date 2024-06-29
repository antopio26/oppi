import {useContext, useState} from "react";
import {AppContext} from "../providers/AppContext";
import axios from "axios";

export default function useMapManager() {
    const {maps, setMaps} = useContext(AppContext);
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

    return {
        getMaps,
        uploadMap
    }
}