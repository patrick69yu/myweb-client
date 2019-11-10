import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import NavigationOutlinedIcon from "@material-ui/icons/NavigationOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(8),
    right: theme.spacing(8)
  }
}));

function ScrollToTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = event => {
    console.log("clicked => ", event);
    const anchor = (event.target.ownerDocument || document).querySelector("h1");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollToTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

export default function ScrollToTopButton(props) {
  return (
    <ScrollToTop {...props}>
      <Fab
        color='primary'
        size='large'
        aria-label='click the button to scroll back to the top of the page'
      >
        <NavigationOutlinedIcon />
      </Fab>
    </ScrollToTop>
  );
}
