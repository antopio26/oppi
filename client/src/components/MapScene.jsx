import React, {useContext, useEffect, useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
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
import {Vector3} from "three";

export default function MapScene({waypoints, waypointsColor, readyState, voxels, rrtPaths, optPaths, smoothPath, interactive = true}) {
    const { primary } = useTheme();
    const { mapMode } = useContext(MapContext);

    const OrbitControlsRef = useRef(null);

    useFrame(() => {
        if (OrbitControlsRef.current && !interactive) {
            OrbitControlsRef.current.update();
            OrbitControlsRef.current.autoRotateSpeed = 1 + 2*Math.pow(Math.sin(OrbitControlsRef.current.getAzimuthalAngle()),2);
        }
    })

    return (
        <group>
            <ambientLight intensity={1}/>
            <directionalLight position={[30, 30, -30]} intensity={1}/>
            {readyState === 1 ?
                <group>
                    <Octomap voxels={voxels}/>
                    {waypoints.length > 0 ? <Nodes nodes={waypoints.map((wp)=>Object.assign({}, wp, {color: waypointsColor.find((c)=>c.id === wp.id).color}) )}/> : null}
                    {rrtPaths.length > 0 ?
                        rrtPaths.map((path, i) => <Path key={i} nodes={path.path} color={new THREE.Color(0x00a86b)} lineWidth={0.5} nodeRadius={0.01}/>)
                        : null}
                    {optPaths.length > 0 ?
                        optPaths.map((path, i) => <Path key={i} nodes={path.path} color={new THREE.Color(0x1E90FF)} lineWidth={.5} nodeRadius={0.025}/>)
                        : null}
                    {smoothPath.length > 0 ? <Path nodes={smoothPath} color={primary || "blue"} lineWidth={2}/> : null}
                </group>
                : null}
            <Helpers/>
            <Camera/>
            <OrbitControls target={!interactive && new Vector3(5, 0, 0)} ref={OrbitControlsRef} autoRotateSpeed={1} autoRotate={!interactive} enabled={interactive}/>
            {interactive && (mapMode.mode === "point-selector" ? <PointSelector/> : null)}
        </group>
    );
}
