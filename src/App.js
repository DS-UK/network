import React from 'react';
import { Graph } from 'react-d3-graph';
import "./styles.css";
import CustomNode from "./data/custom-node/CustomNode";
import "./Connections.css";
import { Connections } from "./Connections";

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
    height: 600,
    maxZoom: 8,
    minZoom: 0.1,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    width: 900,
    d3: {
      alphaTarget: 0.05,
      linkLength: 150,
      linkStrength: 2,
      gravity: -100,
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
      {
        source: 0,
        target: 1,
      },
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
        target: 5,
      },
      {
        source: 5,
        target: 6,
      },
      {
        source: 2,
        target: 10,
      },
      {
        source: 5,
        target: 7,
      },
      {
        source: 4,
        target: 8,
      },
      {
        source: 4,
        target: 9,
      },
      {
        source: 6,
        target: 11,
      },
    ],
    nodes: [
      {
        id: 0,
        name: "Luke",
        gender: "male",
        available: false,
        timezone: "HKT",
        GBGF: "ET",
        Count: 0,
        expertise: ["BigData", "DevOps", "GCP"],
      },
      {
        id: 1,
        name: "Utkarsh",
        gender: "male",
        available: false,
        timezone: "IST",
        GBGF: "Wholesale IT",
        Count: 0,
        expertise: ["React", "Nodejs", "GCP"],
      },
      {
        id: 2,
        name: "Anindya",
        gender: "male",
        available: false,
        timezone: "IST",
        GBGF: "WPB IT",
        Count: 0,
        expertise: ["Oracle", "Java", "MainFrame"],
      },
      {
        id: 3,
        name: "Gil",
        gender: "female",
        available: true,
        timezone: "HKT",
        GBGF: "ITID",
        Count: 0,
        expertise: ["Security", "Java", "DevOps"],
      },
      {
        id: 4,
        name: "Astha",
        gender: "female",
        available: true,
        timezone: "IST",
        GBGF: "WPB IT",
        Count: 0,
        expertise: ["React", "Java", "Security"],
      },
      {
        id: 5,
        name: "Flora",
        gender: "female",
        available: true,
        timezone: "HKT",
        GBGF: "ET",
        Count: 0,
        expertise: ["Java", "DevOps"],
      },
      {
        id: 6,
        name: "Terry",
        gender: "male",
        available: true,
        timezone: "HKT",
        GBGF: "ET",
        Count: 0,
        expertise: ["GCP", "Coaching", "Architect"],
      },
      {
        id: 7,
        name: "Andrew",
        gender: "male",
        available: true,
        timezone: "ACT",
        GBGF: "Regional CIO",
        Count: 0,
        expertise: ["BigData", "Java", "Python"],
      },
      {
        id: 8,
        name: "Christine",
        gender: "female",
        available: false,
        timezone: "HKT",
        GBGF: "Wholesale IT",
        Count: 0,
        expertise: ["DevOps", "Security", "Python"],
      },
      {
        id: 9,
        name: "Nafisa",
        gender: "female",
        available: true,
        timezone: "IST",
        GBGF: "ET",
        Count: 0,
        expertise: ["Python", "Oracle", "AWS"],
      },
      {
        id: 10,
        name: "Shivendra",
        gender: "male",
        available: false,
        timezone: "IST",
        GBGF: "WPB IT",
        Count: 0,
        expertise: ["GCP", "AWS", "Architect"],
      },
      {
        id: 11,
        name: "Chris",
        gender: "male",
        available: true,
        timezone: "UKT",
        GBGF: "Sionic",
        Count: 0,
        expertise: ["Training", "HighPerformance", "Coaching"],
      },
    ],
  };


  const handleRefChange = React.useCallback((ref) => {
    setRef(ref);
  }, []);

  return (
    <>
      <div class="topnav"> Welcome to My Net-Works </div>
      <div id="row" class="content">
        <div >
          
          <Graph
            id="test"
            data={data}
            config={config}
          />
        </div>
        <div class="divide">
        </div>
        <div className="App">
          <Connections />
        </div>
      </div>
    </>
  );

}