import {createContext, useEffect, useState} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {binaryDataToVoxels, decodeMessage} from "../utils/OctomapConversion";
import * as THREE from "three";

export const RemotePlannerContext = createContext({});

export default function RemotePlannerContextProvider({children, remoteURL}) {
    const [waypoints, setWaypoints] = useState([
        {id: 0, coords: {x: 1, y: 0, z: 1}}]);
    const [waypointsColor, setWaypointsColor] = useState([{id: 0, color: "#ff0000"}]);

    const [voxels, setVoxels] = useState({positions: [], sizes: []});
    const [rrtPaths, setRrtPaths] = useState([]);
    const [optPaths, setOptPaths] = useState([]);
    const [smoothPath, setSmoothPath] = useState({path: [], cost: -1});
    const [chronoPath, setChronoPath] = useState([]);

    const [completed, setCompleted] = useState(false);

    // TODO: Add functions to handle sending data and commands to the remote planner
    const sendParameters = (parameters) => {
        if (!parameters) return;

        sendMessage(JSON.stringify({
            topic: 'p', parameters: parameters
        }));
    }

    const changeMap = (map) => {
        sendMessage(JSON.stringify({
            topic: 'm', map: map
        }));
    }

    const resetPlanner = () => {
        // Reset all states
        setVoxels({positions: [], sizes: []})
        setRrtPaths([])
        setChronoPath([])
        setCompleted(false)
        setOptPaths([])
        setSmoothPath({path: [], cost: -1})
    }

    const {sendMessage, getWebSocket, readyState} = useWebSocket(remoteURL, {
        onOpen: (e) => {
            e.target.binaryType = 'arraybuffer';
            // console.log('WebSocket connection established.');

            // Reset all states
            resetPlanner();
        },
        onClose: () => {
            // console.log('WebSocket connection closed.')
        },
        onError: (event) => {
            // console.error('WebSocket error:', event)
        },
        onMessage: async (event) => {
            let arrayBuffer;
            if (event.data instanceof Blob) {
                arrayBuffer = await event.data.arrayBuffer();
            }else{
                arrayBuffer = event.data;
            }
            const msg = decodeMessage(arrayBuffer);

            // Handle different message types
            switch (msg.topic) {
                case 'octomap_path':
                    const nodes = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // nodes structure {time: 0, path: [{x: 0, y: 0, z: 0}, ...], start: {id:0,coords:[]}, goal: {id:0,coords:[]}, cost: 0}
                    // rrtPaths structure [{start: {id:0,coords:[]}, goal: {id:0,coords:[]}, path: [{x: 0, y: 0, z: 0}, ...]}, ...]
                    setRrtPaths([...rrtPaths.filter((path) => (path.start.id !== nodes.start.id || path.goal.id !== nodes.goal.id))
                        ,{start: nodes.start, goal: nodes.goal, path: nodes.path}]);
                    if (nodes.time) {
                        setChronoPath(chronoPath => [...chronoPath, nodes.time]);
                    }
                    break;
                case 'octomap_optimized_path':
                    const optPath = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // same as rrtPaths
                    setOptPaths([...optPaths.filter((path) => (path.start.id !== optPath.start.id || path.goal.id !== optPath.goal.id))
                        ,{start: optPath.start, goal: optPath.goal, path: optPath.path}]);
                    break;
                case 'octomap_smoothed_path':
                    const smoothPath = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // console.log("Smooth Path received");
                    setSmoothPath(smoothPath);
                    break;
                default:
                    if (/^octomap\(\d+(\.\d+)?\)$/.test(msg.topic)) {
                        // console.log("Octomap received");

                        // 'octomap(resolution)'
                        const resolution = parseFloat(msg.topic.match(/\(([^)]+)\)/)[1]);

                        const voxelsData = binaryDataToVoxels(msg.binaryData, resolution);
                        // console.log("Voxels received",voxelsData);
                        voxelsData.positions = voxelsData.positions.map((coords) => new THREE.Vector3(coords[0], coords[2], coords[1]));
                        setVoxels(voxelsData);
                    } else {
                        console.log('Received unknown message:', msg);
                    }
                    break;
            }
        },
        shouldReconnect: (closeEvent) => {
            console.log('WebSocket closed with code:', closeEvent.code);
            return closeEvent.code === 1006;
        }
    });

    const closeWebSocketConnection = () => {
        const webSocketInstance = getWebSocket();
        if (webSocketInstance && webSocketInstance.readyState === WebSocket.OPEN) {
            webSocketInstance.close();
        }
    };

    useEffect(() => {
        if (readyState === WebSocket.OPEN) {
            if (waypoints.length >= 2) {
                if (completed){
                    setCompleted(false)
                } else {
                    sendMessage(JSON.stringify({
                        topic: 'r', waypoints:
                            waypoints.map((wp) => {
                                return {
                                    id: wp.id,
                                    coords: {
                                        x: parseFloat(wp.coords.x) || 0,
                                        y: parseFloat(wp.coords.y) || 0,
                                        z: parseFloat(wp.coords.z) || 0
                                    }
                                };
                            })
                    }));
                }
            }
            let oldRrtPaths = [...rrtPaths];
            let oldOptPaths = [...optPaths];
        }
    }, [waypoints]);

    const connectionState = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <RemotePlannerContext.Provider value={{
            waypoints,
            setWaypoints,
            waypointsColor,
            setWaypointsColor,
            voxels,
            rrtPaths,
            setRrtPaths,
            optPaths,
            setOptPaths,
            smoothPath,
            setSmoothPath,
            chronoPath,
            setCompleted,
            readyState,
            sendParameters,
            changeMap,
            resetPlanner,
        }}>
            {children}
        </RemotePlannerContext.Provider>
    )
};
