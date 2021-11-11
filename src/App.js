import React from 'react';
import { Graph } from 'react-d3-graph';
import CustomNode from "./custom-node/CustomNode";

export default function Sample() {
    const [ref, setRef] = React.useState(null);
    const config = {
        directed: true,
        automaticRearrangeAfterDropNode: true,
        collapsible: true,
        // height: window.innerHeight,
        highlightDegree: 1,
        highlightOpacity: 0.2,
        linkHighlightBehavior: true,
        // maxZoom: 12,
        // minZoom: 0.05,
        nodeHighlightBehavior: true, // comment this to reset nodes positions to work
        panAndZoom: false,
        staticGraph: false,
        // width: window.innerWidth,
        automaticRearrangeAfterDropNode: false,
        height: 400,
        maxZoom: 8,
        minZoom: 0.1,
        nodeHighlightBehavior: true,
        panAndZoom: false,
        width: 800,
        d3: {
            alphaTarget: 0.05,
            gravity: -250,
            linkLength: 120,
            linkStrength: 2,
        },
        node: {
            color: "#d3d3d3",
            fontColor: "black",
            fontSize: 12,
            fontWeight: "normal",
            highlightColor: "red",
            highlightFontSize: 12,
            highlightFontWeight: "bold",
            highlightStrokeColor: "SAME",
            highlightStrokeWidth: 1.5,
            labelProperty: "name",
            // labelClass: "person-node-label",
            mouseCursor: "pointer",
            opacity: 1,
            renderLabel: true,
            size: {
                width: 700,
                height: 900,
            },
            strokeColor: "none",
            strokeWidth: 1.5,
            svg: "",
            symbolType: "circle",
            viewGenerator: node => <CustomNode person={node} />,
        },
        link: {
            color: "#d3d3d3",
            opacity: 1,
            semanticStrokeWidth: false,
            strokeWidth: 4,
            highlightColor: "blue",
        },
    };
    const data = {
        links: [
            // Groups
            {
                source: 0,
                target: 2,
            },
            {
                source: 0,
                target: 3,
            },
            {
                source: 0,
                target: 4,
            },
            {
                source: 0,
                target: 1,
            },
        ],
        nodes: [
            // Groups
            {
                id: 0,
                name: "1 person",
                gender: "female",
                isOnline: false,
            },
            {
                id: 1,
                name: "1 person",
                gender: "male",
                isOnline: true,
            },
            {
                id: 2,
                name: "2 person",
                gender: "male",
                isOnline: false,
            },
            {
                id: 3,
                name: "3 person",
                gender: "male",
                isOnline: true,
            },
            {
                id: 4,
                name: "Melanie",
                gender: "female",
                isOnline: true,
            },
        ],
    };


    const handleRefChange = React.useCallback((ref) => {
        setRef(ref);
    }, []);

    return (
        <>
            <button>I am doing nothing lol !!</button>
            <Graph
                id="test"
                data={data}
                config={config}
                ref={handleRefChange}
            />
        </>
    );
}
