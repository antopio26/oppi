import {useContext, useEffect, useState} from "react";
import * as THREE from "three";
import useWebSocket, {ReadyState} from 'react-use-websocket';
import {decodeMessage, binaryDataToVoxels} from "../utils/OctomapConversion";
import {AppContext} from "../providers/AppContext";

export default function useRemotePlanner(remoteURL, waypoints = []) {

    const [voxels, setVoxels] = useState({positions: [], sizes: []});
    const [rrtPaths, setRrtPaths] = useState([]);
    const [optPaths, setOptPaths] = useState([]);
    const [smoothPath, setSmoothPath] = useState({path: [], cost: -1});
    const [chronoPath, setChronoPath] = useState([]);

    const [completed, setCompleted] = useState(false);

    const {selectedProject} = useContext(AppContext);

    const [first, setFirst] = useState(true);

    useEffect(() => {
        if (first && selectedProject) {
            sendParameters();
            sendMessage(JSON.stringify({
                topic: 'm', map: selectedProject.map
            }));
            setFirst(false);
        }
    },[selectedProject])

    const {sendMessage, getWebSocket, readyState} = useWebSocket(remoteURL, {
        onOpen: (e) => {
            e.target.binaryType = 'arraybuffer';
            console.log('WebSocket connection established.');

            // Reset all states when a new connection is established
            setVoxels({positions: [], sizes: []})
            setRrtPaths([])
            // setWaypoints([])
            setChronoPath([])
            setCompleted(false)
            setOptPaths([])
            setSmoothPath({path: [], cost: -1})
        },
        onClose: () => {
            console.log('WebSocket connection closed.')
        },
        onError: (event) => {
            console.error('WebSocket error:', event)
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
                    // rrtPaths structure [{start: 0, goal: 1, path: [{x: 0, y: 0, z: 0}, ...]}, ...]
                    setRrtPaths([...rrtPaths.filter((path) => {
                        return (path.start !== nodes.start.id || path.goal !== nodes.goal.id)
                    }),{start: nodes.start.id, goal: nodes.goal.id, path: nodes.path}]);
                    if (nodes.time) {
                        setChronoPath(chronoPath => [...chronoPath, nodes.time]);
                    }
                    break;
                case 'octomap_optimized_path':
                    const optPath = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // same as rrtPaths
                    setOptPaths([...optPaths.filter((path) => {
                        return (path.start !== optPath.start.id || path.goal !== optPath.goal.id)
                    }),{start: optPath.start.id, goal: optPath.goal.id, path: optPath.path}]);
                    break;
                case 'octomap_smoothed_path':
                    const smoothPath = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // console.log("Smooth Path received");
                    setSmoothPath(smoothPath.path);
                    break;
                default:
                    if (/^octomap\(\d+(\.\d+)?\)$/.test(msg.topic)) {
                        console.log("Octomap received");

                        // 'octomap(resolution)'
                        const resolution = parseFloat(msg.topic.match(/\(([^)]+)\)/)[1]);

                        const voxelsData = binaryDataToVoxels(msg.binaryData, resolution);
                        console.log("Voxels received",voxelsData);
                        voxelsData.positions = voxelsData.positions.map((coords) => new THREE.Vector3(...coords));
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

    // TODO: Add functions to handle sending data and commands to the remote planner
    const sendParameters = (parameters) => {
        sendMessage(JSON.stringify({
            topic: 'p', parameters: parameters || selectedProject.parameters
        }));
    }

    useEffect(() => {
        if (readyState === WebSocket.OPEN) {
            if (waypoints.length >= 2) {
                console.log("Waypoints sent", waypoints);
                sendMessage(JSON.stringify({
                    topic: 'r', waypoints:
                        waypoints.map((wp) => {
                            return {id: wp.id,
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
    }, [waypoints]);

    useEffect(() => {
        console.log("RRT Paths sent", rrtPaths);
    },[rrtPaths]);

    const connectionState = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return {
        voxels,
        rrtPaths,
        waypoints,
        optPaths,
        smoothPath,
        chronoPath,
        completed,
        readyState,
        sendParameters
    }

}

