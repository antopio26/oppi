import { useEffect, useState } from "react";
import * as THREE from "three";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { decodeMessage, binaryDataToVoxels } from "../utils/OctomapConversion";

export default function useRemotePlanner(remoteURL) {

    const [voxels, setVoxels] = useState({positions: [], sizes: []});
    const [nodes, setNodes] = useState([]);
    const [waypoints, setWaypoints] = useState({});
    const [optPath, setOptPath] = useState({path: [], cost: -1});
    const [smoothPath, setSmoothPath] = useState({path: [], cost: -1});
    const [chronoPath, setChronoPath] = useState([]);

    const [completed, setCompleted] = useState(false);

    const {sendMessage, getWebSocket, readyState} = useWebSocket(remoteURL, {
        onOpen: () => {
            console.log('WebSocket connection established.');

            // Reset all states when a new connection is established
            setVoxels({positions: [], sizes: []})
            setNodes([])
            setWaypoints({})
            setChronoPath([])
            setCompleted(false)
            setOptPath({path: [], cost: -1})
            setSmoothPath({path: [], cost: -1})
        },
        onClose: () => {
            console.log('WebSocket connection closed.')
        },
        onError: (event) => {
            console.error('WebSocket error:', event)
        },
        onMessage: (event) => {
            const msg = decodeMessage(event.data);

            // Handle different message types
            switch (msg.topic) {
                case 'octomap':
                    const voxelsData = binaryDataToVoxels(msg.binaryData);
                    // console.log("Voxels received");
                    voxelsData.positions = voxelsData.positions.map((coords) => new THREE.Vector3(...coords));
                    setVoxels(voxelsData);
                    break;
                case 'octomap_path':
                    const nodes = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // console.log("Path received");
                    // console.log(nodes.path);
                    setNodes(nodes.path);
                    if (nodes.time) {
                        setChronoPath(chronoPath => [...chronoPath, nodes.time]);
                    }
                    break;
                case 'octomap_endpoints':
                    const waypoints = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // console.log("Waypoints received");
                    setWaypoints(waypoints);
                    break;
                case 'octomap_completed':
                    const completed = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // console.log("Path Planning completed");
                    setCompleted(completed);
                    setNodes(completed.path);
                    break;
                case 'octomap_optimized_path':
                    const optPath = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // console.log("Optimal Path received");
                    setOptPath(optPath);
                    break;
                case 'octomap_smoothed_path':
                    const smoothPath = JSON.parse(new TextDecoder('utf-8').decode(msg.binaryData));
                    // console.log("Smooth Path received");
                    setSmoothPath(smoothPath);
                    break;
                default:
                    console.log('Received unknown message:', msg);
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
            const webSocketInstance = getWebSocket();
            if (webSocketInstance && 'binaryType' in webSocketInstance) {
                webSocketInstance.binaryType = 'arraybuffer';
            }
        }
    }, [readyState]);

    // TODO: Add functions to handle sending data and commands to the remote planner

    const connectionState = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return {
        voxels,
        nodes,
        waypoints,
        optPath,
        smoothPath,
        chronoPath,
        completed,
        readyState,
    }

}

