import React, {useEffect} from "react";

export function Node({position, nodeColor = 'blue'}) {
    useEffect(() => {
    }, []);
    return (
        <mesh position={[position.x, position.y, position.z]}>
            <sphereGeometry args={[.1, 16, 16]}/>
            <meshStandardMaterial color={nodeColor}/>
        </mesh>
    );

}

export function Nodes({nodes}) {
    return (
        <group>
            {nodes.map(((node) => <Node key={node.id} position={node.coords} nodeColor={node.color || "blue"}/>))}
        </group>
    );
}