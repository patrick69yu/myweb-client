import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: "Caveat, Helvetica, Arial, sans-serif",
    fontSize: "1.2rem"
  },
  cta: {
    color: theme.palette.primary.main,
    textDecorationLine: "none",
    cursor: "pointer",
    position: "relative",
    "&:after": {
      content: "''",
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: theme.palette.secondary.main,
      transition: "all 0.3s ease",
      borderRadius: theme.spacing(1),
      transform: "rotateY(90deg)"
    },
    "&:hover": {
      textDecorationLine: "none",
      "&:after": {
        transform: "rotateY(0deg)"
      }
    }
  }
}));

export default function AttributionToNewsAPI() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      Powered by&nbsp;
      <Link
        className={classes.cta}
        href='https://newsapi.org/'
        onClick={event => event.preventDefault()}
      >
        NewsAPI.org
      </Link>
    </div>
  );
}
