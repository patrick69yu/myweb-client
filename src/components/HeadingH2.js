import React from "react";
import PropTypes from "prop-types";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  h2: {
    fontSize: "2.6rem",
    textAlign: "inherit",
    lineHeight: "1",
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem"
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3.5rem"
    }
  }
}));

export default function HeadingH2(props) {
  const classes = useStyles();
  const { title } = props;

  return (
    <Typography className={classes.h2} component="h2">
      {title}
    </Typography>
  );
}

HeadingH2.propTypes = {
  title: PropTypes.string.isRequired
};
