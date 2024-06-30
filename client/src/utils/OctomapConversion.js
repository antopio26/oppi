function binaryDataToVoxels(data, resolution = 0.1) {
    let index = 0;
    const voxelPositions = [];
    const voxelSizes = [];

    function readBinaryNode(node, position, size) {
        const child1to4 = data[index++];
        const child5to8 = data[index++];

        node.logOdds = 1;

        // Process first 4 children
        processChildren(node, child1to4, position, size, true);

        // Process next 4 children
        processChildren(node, child5to8, position, size, false);

        if (node.children.length > 0) {
            const offset = size / 4;
            for (let i = 0; i < 8; i++) {
                if (node.children[i].logOdds === -100) {
                    const dx = (i & 1) ? offset : -offset;
                    const dz = (i & 2) ? offset : -offset;
                    const dy = (i & 4) ? offset : -offset;
                    readBinaryNode(node.children[i], [position[0] + dx, position[1] + dy, position[2] + dz], offset * 2);
                }
            }
        }
    }

    function processChildren(node, childData, position, size, firstFour) {
        for (let i = 0; i < 4; i++) {
            const bits = (childData >> i * 2) & 0b11;
            const child = {
                logOdds: bits === 0b10 ? 1 : (bits === 0b01 ? 0 : (bits === 0b11 ? -100 : -1)),
                children: []
            };
            node.children.push(child);

            if (child.logOdds === 1) {
                const dx = (i & 1) ? size / 4 : -size / 4;
                const dz = (i & 2) ? size / 4 : -size / 4;
                const dy = firstFour ? 0 : size / 2;

                voxelPositions.push([position[0] + dx, position[1] + dy, position[2] + dz]);
                voxelSizes.push(size / 2);
            }
        }
    }

    // Create a new tree node
    const root = {
        logOdds: 1,
        children: []
    };

    // Read the root node
    readBinaryNode(root, [0, 0, 0], 3276.8 * 2 * 10 * resolution);

    return { positions: voxelPositions, sizes: voxelSizes };
}

function decodeMessage(arrayBuffer) {
    // Create a DataView to read the ArrayBuffer
    const view = new DataView(arrayBuffer);

    // Read the topic length (4 bytes)
    const topicLength = view.getUint32(0, true); // Little-endian

    // Calculate the start index of the topic string
    const startIndex = 4;

    // Read the topic string
    let topic = "";
    for (let i = 0; i < topicLength; i++) {
        const charCode = view.getUint8(startIndex + i);
        topic += String.fromCharCode(charCode);
    }

    // Calculate the start index of the binary data
    const binaryDataStartIndex = startIndex + topicLength;

    // Read the binary data
    const binaryData = new Uint8Array(arrayBuffer, binaryDataStartIndex);

    // Return the topic and binary data
    return { topic: topic, binaryData: binaryData };
}

export { binaryDataToVoxels, decodeMessage };