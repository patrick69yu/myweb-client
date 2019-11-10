import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";

// Import components
import QuoteOfTheDay from "../Utils/QuoteOfTheDay";
import ScrollToTopButton from "../ScrollToTopButton";
import HeadingH1 from "../HeadingH1";

const bgImgUrl = "https://source.unsplash.com/collection/2208580";

const useStyles = makeStyles(theme => ({
  root: {
    background: "url(" + bgImgUrl + ") #FFF border-box center no-repeat fixed",
    backgroundSize: "cover",
    width: "100%",
    height: "100%"
  }
}));

export default function Home() {
  const classes = useStyles();
  const h1Title = "Work And Life Start After Coffee";

  return (
    <section className={classes.root}>
      <HeadingH1 title={h1Title} />
      <QuoteOfTheDay />
      <ScrollToTopButton />
    </section>
  );
}
