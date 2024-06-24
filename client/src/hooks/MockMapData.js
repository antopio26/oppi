import { useEffect, useState } from "react";
import { binaryDataToVoxels, decodeMessage } from "../utils/OctomapConversion";
import * as THREE from "three";

export default function useMockMapData(mapFilePath, dataFilePath) {
    const [voxels, setVoxels] = useState({ positions: [], sizes: [] });
    const [rrtPaths, setRrtPaths] = useState([]);
    const [optPaths, setOptPaths] = useState([]);
    const [smoothPath, setSmoothPath] = useState([]);
    const [chronoPath, setChronoPath] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [waypoints, setWaypoints] = useState([]);
    const [waypointsColor, setWaypointsColor] = useState([]);
    const readyState = 1;

    useEffect(() => {
        const fetchFileAsArrayBuffer = async (filePath) => {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}`);
            }
            return await response.arrayBuffer();
        };

        const fetchFileAsText = async (filePath) => {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}`);
            }
            return await response.text();
        };

        const processMapFile = async () => {
            try {
                const mapArrayBuffer = await fetchFileAsArrayBuffer(mapFilePath);
                const binaryData = new Uint8Array(mapArrayBuffer);

                // console.log(binaryData);

                const voxelsData = binaryDataToVoxels(binaryData);

                voxelsData.positions = voxelsData.positions.map((coords) => new THREE.Vector3(...coords));
                setVoxels(voxelsData);
                setCompleted(true);
            } catch (error) {
                console.error("Error processing map file:", error);
            }
        };

        const processDataFile = async () => {
            try {
                const dataText = await fetchFileAsText(dataFilePath);
                const data = JSON.parse(dataText);

                setRrtPaths(data.rrtPaths || []);
                setOptPaths(data.optPaths || []);
                setSmoothPath(data.smoothPath.path || []);
                setChronoPath(data.chronoPath || []);
                setCompleted(true);
                setWaypoints(data.waypoints || []);
                setWaypointsColor(data.waypointsColor || []);
            } catch (error) {
                console.error("Error processing data file:", error);
            }
        };

        if (mapFilePath && dataFilePath) {
            processMapFile();
            processDataFile();
        }
    }, [mapFilePath, dataFilePath]);

    return {
        voxels,
        rrtPaths,
        optPaths,
        smoothPath,
        chronoPath,
        completed,
        waypoints,
        waypointsColor,
        readyState
    };
}
