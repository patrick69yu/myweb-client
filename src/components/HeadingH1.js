import React from "react";
import PropTypes from "prop-types";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  h1: {
    fontSize: "3rem",
    padding: "1.5rem 1rem",
    textAlign: "center",
    textShadow: "1px 1px",
    lineHeight: "1.2",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3.5rem",
      padding: "2rem 1rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "4rem",
      padding: "2.5rem 2rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "5rem",
      padding: "3rem 1.5rem"
    }
  }
}));

export default function HeadingH1(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <Typography
      className={classes.h1}
      color="secondary"
      component="h1"
      id="backToTopAnchor"
    >
      {title}
    </Typography>
  );
}

HeadingH1.propTypes = {
  title: PropTypes.string.isRequired
};
