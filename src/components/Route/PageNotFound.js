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

export default function PageNotFound() {
  const classes = useStyles();
  const h1Title = "Page Not Found";

  return (
    <section className={classes.root}>
      <HeadingH1 title={h1Title} />
      <Typography className={classes.msg}>
        Sorry, the URL "{document.location.href}" is not found.
      </Typography>
    </section>
  );
}
