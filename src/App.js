import { Graph } from "react-d3-graph";
import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import inpData from "./data.json";
import CustomNode from "./CustomNode";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
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
  const [tag, setTag] = React.useState("All");
  const classes = useStyles();
  const divRef = React.useRef();
  const [reset, setReset] = useState(false);
  const [tags, setTags] = React.useState([
    { label: "All", value: "All" }
  ]);

  const indicators = [
    { label: "All", value: "All" },
    {
      value: "N",
      label: "No"
    },
    { value: "Y", label: "Yes" }
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
    setTag(event.target.value);
  };

  const handleImpactChange = event => {
    setImpactInd(event.target.value);
  };

  useEffect(() => {
    console.log(inpData);
    const uniqueTags = inpData.nodes
      .map(val => val.tag)
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      })
      .map(val => ({ label: val, value: val }));
    // console.log(uniqueTags);
    setTags(tags => tags.concat(uniqueTags));
    setData(inpData);
    setFilteredData(inpData);
  }, []);

  //useEffect to reset the graph to initial state - workaround for now
  useEffect(() => {
    if (reset) {
      if (tag === "All" && impactInd === "All") {
        setFilteredData(data);
        setReset(false);
      } else {
        const filteredNodes = data.nodes.filter(
          val => val.isOnLine === impactInd
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
      if (tag === "All" && impactInd === "All") {
        setReset(true);
      } else if (tag === "All" && impactInd !== "All") {
        setReset(true);
      } else if (tag !== "All" && impactInd === "All") {
        filteredNodes = data.nodes.filter(val => val.tag === tag);
        getNewData(filteredNodes);
      } else {
        filteredNodes = data.nodes.filter(
          val =>
            val.tag === tag && val.isOnLine === impactInd
        );
        getNewData(filteredNodes);
      }
    }
  }, [tag, impactInd]);

  const getNewData = filteredNodes => {
    // console.log(data,filteredNodes);
    let outsideTag = [];
    const filteredLinks = data.links.filter(val => {
      if (filteredNodes.map(val => val.id).indexOf(val.source) !== -1) {
        return true;
      }
    });

    //get employees gone outside the tag where target not in their tag
    filteredLinks.forEach(val => {
      if (filteredNodes.map(val => val.id).indexOf(val.target) === -1) {
        outsideTag.push(
          data.nodes.filter(innerval => innerval.id === val.target)[0]
        );
      }
    });
    console.log(outsideTag);
    const newFilteredNodes = filteredNodes.concat(outsideTag);
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
      <div style={{ display: "flex", backgroundColor: "#04AA6D", justifyContent: "center", fontSize: "50px" }}> Welcome to My Net-Works </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex", justifyContent: "flex-start", width: "300px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Tag
          </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={tag}
                onChange={handleChange}
                label="Tag"
              >
                {tags.map(val => {
                  return (
                    <MenuItem key={val.value} value={val.value}>
                      {val.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {/* next filter */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Online
          </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={impactInd}
                onChange={handleImpactChange}
                label="Tag"
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
            <div className="App">
              <Connections />
            </div>
            <Legends />
          </div>
          <div ref={divRef} style={{}}>
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
                      Gender:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.gender}
                    </Typography>
                  </div>
                  <div>
                    <Typography component="label" variant="subtitle2">
                      Count:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.count}
                    </Typography>
                  </div>
                  <div>
                    <Typography component="label" variant="subtitle2">
                      Tag:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.tag}
                    </Typography>
                  </div>
                  <div>
                    <Typography component="label" variant="subtitle2">
                      Is Online:
                  </Typography>
                    <Typography component="span" variant="subtitle1">
                      {person.isOnLine}
                    </Typography>
                  </div>
                </div>
              ) : null}
            </Popover>
          </div>

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
              <div style={{ display: "flex", fontSize: "30px", alignItems: "center" }}>
                No Data found for selected Criteria</div>
            )
        ) : null}
      </div>
    </React.Fragment>
  );
}
