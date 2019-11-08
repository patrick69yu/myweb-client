import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import QuoteOfTheDay from "../Utils/QuoteOfTheDay";

const useStyles = makeStyles(theme => ({
  h1: {}
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Fragment>
      <Typography className={classes.h1} color='primary' variant='h1'>
        After Coffee
      </Typography>
      <QuoteOfTheDay />
    </Fragment>
  );
}
