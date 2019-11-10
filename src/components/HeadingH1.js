import React from "react";
import PropTypes from "prop-types";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  h1: {
    fontSize: "5rem",
    textAlign: "center",
    padding: "3rem 1.5rem",
    textShadow: "1px 1px",
    [theme.breakpoints.down("md")]: {
      fontSize: "4rem",
      padding: "2.5rem 2rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "3.5rem",
      padding: "2rem 1rem"
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "3rem",
      padding: "1.5rem 1rem"
    }
  }
}));

export default function HeadingH1(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <Typography
      className={classes.h1}
      color='secondary'
      component='h1'
      id='backToTopAnchor'
    >
      {title}
    </Typography>
  );
}

HeadingH1.propTypes = {
  title: PropTypes.string.isRequired
};
