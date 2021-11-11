import { Graph } from "react-d3-graph";
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import inpData from "./data.json";
import CustomNode from "./CustomNode";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";
import Legends from "./Legends";
import "./Connections.css";
import { Connections } from "./Connections";


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  }
}));
console.log(inpData);
export default function App() {
  // graph payload (with minimalist structure)
  const [building, setBuilding] = React.useState("All");
  const classes = useStyles();
  const divRef = React.useRef();
  const [reset, setReset] = useState(false);
  const [buildings, setBuildings] = React.useState([
    { label: "All", value: "All" }
  ]);

  const indicators = [
    { label: "All", value: "All" },
    {
      value: "N",
      label: "No Impact (N)"
    },
    { value: "I", label: "COVID Impacted (I)" },
    { value: "Q", label: "Quarantined / To Be Quarantined (Q)" },
    { value: "C", label: "Monitor - Low Risk (C)" },
    { value: "M", label: "Monitor - High Risk (M)" }
  ];
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [impactInd, setImpactInd] = useState("All");
  const graphRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [person, setPerson] = useState(null);

  const handlePopoverOpen = person => {
    console.log(person);
    setAnchorEl(divRef.current);
    setPerson(person);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setPerson(null);
  };

  const handleChange = event => {
    setBuilding(event.target.value);
  };

  const handleImpactChange = event => {
    setImpactInd(event.target.value);
  };

  useEffect(() => {
    console.log(inpData);
    const uniqueBuildings = inpData.nodes
      .map(val => val.building)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .map(val => ({ label: val, value: val }));
    //   console.log(uniqueBuildings);
    setBuildings(buildings => buildings.concat(uniqueBuildings));
    setData(inpData);
    setFilteredData(inpData);
  }, []);

  //useEffect to reset the graph to initial state - workaround for now
  useEffect(() => {
    if (reset) {
      if (building === "All" && impactInd === "All") {
        setFilteredData(data);
        setReset(false);
      } else {
        const filteredNodes = data.nodes.filter(
          val => val.covidImpactIndicator === impactInd
        );
        setReset(false);
        getNewData(filteredNodes);
      }
    }
  }, [reset]);

  useEffect(() => {
    if (data) {
      let filteredNodes;
      setFilteredData(null);
      if (building === "All" && impactInd === "All") {
        setReset(true);
      } else if (building === "All" && impactInd !== "All") {
        setReset(true);
      } else if (building !== "All" && impactInd === "All") {
        filteredNodes = data.nodes.filter(val => val.building === building);
        getNewData(filteredNodes);
      } else {
        filteredNodes = data.nodes.filter(
          val =>
            val.building === building && val.covidImpactIndicator === impactInd
        );
        getNewData(filteredNodes);
      }
    }
  }, [building, impactInd]);

  const getNewData = filteredNodes => {
    // console.log(data,filteredNodes);
    let outsideBuilding = [];
    const filteredLinks = data.links.filter(val => {
      if (filteredNodes.map(val => val.id).indexOf(val.source) !== -1) {
        return true;
      }
    });

    //get employees gone outside the building where target not in their building
    filteredLinks.forEach(val => {
      if (filteredNodes.map(val => val.id).indexOf(val.target) === -1) {
        outsideBuilding.push(
          data.nodes.filter(innerval => innerval.id === val.target)[0]
        );
      }
    });
    console.log(outsideBuilding);
    const newFilteredNodes = filteredNodes.concat(outsideBuilding);
    //console.log(filteredLinks);
    const newData = { nodes: newFilteredNodes, links: filteredLinks };
    setFilteredData(newData);
  };

  const open = Boolean(anchorEl);

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used
  const myConfig = {
    nodeHighlightBehavior: true,
    height: 700,
    width: 1200,
    focusAnimationDuration: 0.75,
    focusZoom: 1,
    highlightDegree: 1,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    d3: {
      // linkLength:200
      gravity: -100 //default is -100
    },
    node: {
      size: 120,
      highlightStrokeColor: "blue",
      labelProperty: "employeeName",
      viewGenerator: node => (
        <CustomNode
          person={node}
          showPersonDetails={person => handlePopoverOpen(person)}
          hidePersonDetails={handlePopoverClose}
        />
      )
    },
    link: {
      highlightColor: "blue",
      labelProperty: "message"
      // renderLabel:true,
      // fontSize :6
      //  semanticStrokeWidth :true
    }
  };

  // graph event callbacks
  // const onClickGraph = function () {
  //   window.alert(`Clicked the graph background`);
  // };

  // const onClickNode = function (nodeId) {
  //   window.alert(`Clicked node ${nodeId}`);
  // };

  // const onDoubleClickNode = function (nodeId) {
  //   window.alert(`Double clicked node ${nodeId}`);
  // };

  // const onRightClickNode = function (event, nodeId) {
  //   window.alert(`Right clicked node ${nodeId}`);
  // };

  // const onMouseOverNode = function(nodeId) {
  //   window.alert(`Mouse over node ${nodeId}`);
  // };

  // const onMouseOutNode = function(nodeId) {
  //   window.alert(`Mouse out node ${nodeId}`);
  // };

  // const onClickLink = function (source, target) {
  //   window.alert(`Clicked link between ${source} and ${target}`);
  // };

  // const onRightClickLink = function (event, source, target) {
  //   window.alert(`Right clicked link between ${source} and ${target}`);
  // };

  // const onMouseOverLink = function(source, target) {
  //   window.alert(`Mouse over in link between ${source} and ${target}`);
  // };

  // const onMouseOutLink = function(source, target) {
  //   window.alert(`Mouse out link between ${source} and ${target}`);
  // };

  // const onNodePositionChange = function(nodeId, x, y) {
  //   window.alert(
  //     `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
  //   );
  // };

  console.log(indicators, impactInd, filteredData, graphRef);
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#04AA6D", justifyContent: "flex-start" }}> Welcome to My Net-Works </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Building
          </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={building}
              onChange={handleChange}
              label="Building"
            >
              {buildings.map(val => {
                return (
                  <MenuItem key={val.value} value={val.value}>
                    {val.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">
              Covid Impact
          </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={impactInd}
              onChange={handleImpactChange}
              label="Building"
            >
              {indicators.map(val => {
                return (
                  <MenuItem key={val.value} value={val.value}>
                    {val.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div ref={divRef} style={{ marginLeft: 120 }}>
            <Popover
              id="mouse-over-popover"
              open={open}
              className={classes.popover}
              classes={{
                paper: classes.paper
              }}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center"
              }}
              transformOrigin={{
                vertical: "center",
                horizontal: "center"
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              {person !== null ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div>
                    <Typography component="label" variant="subtitle2">
                      Emp ID:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.id}
                    </Typography>
                  </div>
                  <div>
                    <Typography component="label" variant="subtitle2">
                      Name:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.employeeName}
                    </Typography>
                  </div>
                  <div>
                    <Typography component="label" variant="subtitle2">
                      Seat Number:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.seatNo}
                    </Typography>
                  </div>
                  <div>
                    <Typography component="label" variant="subtitle2">
                      Building:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.building}
                    </Typography>
                  </div>
                  <div>
                    <Typography component="label" variant="subtitle2">
                      Covid Impact Indicator:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.covidImpactIndicator}
                    </Typography>
                  </div>
                </div>
              ) : null}
            </Popover>
          </div>
          <Legends />
        </div>
        {reset ? (
          <div>Resetting</div>
        ) : filteredData ? (
          filteredData.nodes.length > 0 ? (
            <Graph
              id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
              data={filteredData}
              ref={graphRef}
              config={myConfig}
            // onClickNode={onClickNode}
            // onDoubleClickNode={onDoubleClickNode}
            // onRightClickNode={onRightClickNode}
            // onClickGraph={onClickGraph}
            // onClickLink={onClickLink}
            // onRightClickLink={onRightClickLink}
            // onMouseOverNode={onMouseOverNode}
            // onMouseOutNode={onMouseOutNode}
            // onMouseOverLink={onMouseOverLink}
            // onMouseOutLink={onMouseOutLink}
            // onNodePositionChange={onNodePositionChange}
            />
          ) : (
              <div>No Data found for selected Criteria</div>
            )
        ) : null}
        <div style={{ borderLeft: "green", height: "500px" }}>
        </div>
        <div className="App">
          <Connections />
        </div>
      </div>
    </React.Fragment>
  );
}
