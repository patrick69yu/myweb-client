import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

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
      <Typography className={classes.msg}>Hey there,</Typography>
      <Typography className={classes.msg}>I'm Patrick Yu</Typography>
      <Typography className={classes.msg}>A web developer</Typography>
      <Typography className={classes.msg}>
        You can see my resume&nbsp;
        <Link
          href="https://drive.google.com/open?id=1Iindq0R2HdMtkskIe_sdLAOVxsjgWDcW"
          target="_blank"
          underline="always"
        >
          here
        </Link>
      </Typography>
    </section>
  );
}
