import React from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";

// Import components
import HeadingH1 from "../HeadingH1";
import ScrollToTopButton from "../ScrollToTopButton";
import QuoteOfTheDay from "../Utils/QuoteOfTheDay";
import NewsFeed from "../Utils/NewsFeed";
import AttributionToNewsAPI from "../AttributionToNewsAPI";
import HeadingH2 from "../HeadingH2";

// const bgImgUrl = "https://source.unsplash.com/collection/2208580";

const useStyles = makeStyles(theme => ({
  root: {
    // background: "url(" + bgImgUrl + ") #FFF border-box center no-repeat fixed",
    background: "#000",
    backgroundSize: "cover",
    width: "100%",
    height: "100%"
  },
  page1: {
    width: "inherit",
    height: "inherit",
    textAlign: "center"
  },
  page2: {
    width: "inherit",
    paddingTop: theme.spacing(4),
    textAlign: "center"
  }
}));

export default function Home() {
  const classes = useStyles();
  const h1Title = "Work And Life Start After Coffee";

  return (
    <section className={classes.root}>
      <section className={classes.page1}>
        <HeadingH1 title={h1Title} />
        <QuoteOfTheDay />
      </section>
      <section className={classes.page2}>
        <HeadingH2 title='News' />
        <AttributionToNewsAPI />
        <NewsFeed />
      </section>
      <ScrollToTopButton />
    </section>
  );
}
