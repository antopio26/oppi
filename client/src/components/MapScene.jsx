import React, {useContext, useEffect} from 'react';
import {useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {OrbitControls} from '@react-three/drei';
import {Octomap} from "./threejs/Octomap";
import {Nodes} from "./threejs/Nodes";
import {Path} from "./threejs/Path";
import {PointSelector} from "./threejs/PointSelector";
import useTheme from "../hooks/Theme";
import {Helpers} from "./threejs/Helpers";
import {Camera} from "./threejs/Camera";
import {MapContext} from "../providers/MapContext";

export default function MapScene({/*connection, voxels, nodes, optPath, smoothPath*/}) {
    const {primary} = useTheme();
    const {mapMode, waypoints, waypointsColor, connection, voxels, nodes, optPath, smoothPath} = useContext(MapContext);

    useEffect(() => {
        console.log("Smooth", smoothPath)
    },[smoothPath]);

    useEffect(() => {
        console.log("Opt", optPath)
    },[optPath]);

    useEffect(() => {
        console.log("Nodes",nodes)
    },[nodes]);

    return (
        <group>
            <ambientLight intensity={1}/>
            <directionalLight position={[30, 30, -30]} intensity={1}/>
            {connection === 1 ?
                <group>
                    <Octomap voxels={voxels}/>
                    {waypoints.length > 0 ? <Nodes nodes={waypoints.map((wp)=>Object.assign({}, wp, {color: waypointsColor.find((c)=>c.id === wp.id).color}) )}/> : null}
                    {nodes.length > 0 ? <Path nodes={nodes} color={new THREE.Color(0x00a86b)} lineWidth={0.5}
                                              nodeRadius={0.01}/> : null}
                    {optPath.length > 0 ? <Path nodes={optPath} color={new THREE.Color(0x1E90FF)} lineWidth={0.5}
                                                nodeRadius={0.025}/> : null}
                    {smoothPath.length > 0 ? <Path nodes={smoothPath} color={primary || "blue"} lineWidth={2}/> : null}
                </group>
                : null}
            <Helpers/>
            <Camera/>
            <OrbitControls/>
            {mapMode.mode === "point-selector" ? <PointSelector/> : null}
        </group>
    );
}
