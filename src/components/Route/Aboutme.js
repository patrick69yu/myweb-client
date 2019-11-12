import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

// Import components
import HeadingH1 from "../HeadingH1";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    textAlign: "center"
  },
  msg: {
    fontSize: "2.5rem"
  }
}));

export default function Aboutme() {
  const classes = useStyles();
  const h1Title = "About Me";

  return (
    <section className={classes.root}>
      <HeadingH1 title={h1Title} />
      <Typography className={classes.msg}>
        More great things are coming...
      </Typography>
    </section>
  );
}
