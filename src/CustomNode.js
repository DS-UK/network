/* eslint-disable valid-jsdoc */
import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: "none"
  },
  paper: {
    padding: theme.spacing(1)
  }
}));

function CustomNode(props) {
  const { person, showPersonDetails, hidePersonDetails, setPerson } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();
  const classes = useStyles();

  const handlePopoverOpen = event => {
    console.log(divRef.current);
    setAnchorEl(divRef.current);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const styles = {
    container: {
      width: 12,
      height: 12,
      background: person.fill,
      borderRadius: "50%"
    }
  };
  // console.log(person);

  const open = Boolean(anchorEl);
  return (
    <div
      style={styles.container}
      onMouseEnter={() => showPersonDetails(person)}
      onMouseLeave={hidePersonDetails}
    >
      {/* <Popover
        id="mouse-over-popover"
        open={open}
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div style={{display:"flex",flexDirection:"column"}}>
          <div>
            <Typography component="label" variant="subtitle2">Name:</Typography>
            <Typography component="span" variant="subtitle1">
              {person.employeeName}
            </Typography>
          </div>
          <div>
            <Typography component="label" variant="subtitle2">Seat Number:</Typography>
            <Typography component="span" variant="subtitle1">
              {person.seatNo}
            </Typography>
          </div>
          <div>
            <Typography component="label" variant="subtitle2">Tag:</Typography>
            <Typography component="span" variant="subtitle1">
              {person.tag}
            </Typography>
          </div>
          <div>
            <Typography component="label" variant="subtitle2">Covid Impact Indicator:</Typography>
            <Typography component="span" variant="subtitle1">
              {person.isOnLine}
            </Typography>
          </div>
        </div>
      </Popover> */}
    </div>
  );
}

export default CustomNode;
