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

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%"
  },
  page1: {
    width: "inherit",
    height: "auto",
    minHeight: "100%",
    textAlign: "center",
    background: "#000",
    padding: theme.spacing(2, 0, 6)
  },
  page2: {
    width: "inherit",
    textAlign: "center",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing(6)
    },
    [theme.breakpoints.up("md")]: {
      paddingBottom: theme.spacing(8)
    }
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
        <HeadingH2 title="News" />
        <AttributionToNewsAPI />
        <NewsFeed />
      </section>
      <ScrollToTopButton />
    </section>
  );
}
