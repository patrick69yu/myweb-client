import React, { useState, useEffect } from "react";
import axios from "axios";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormatQuoteOutlinedIcon from "@material-ui/icons/FormatQuoteOutlined";

// Import components
import HeadingH2 from "../HeadingH2";
import AttributionToQuotesAPI from "../AttributionToQuotesAPI";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    margin: "0 25%",
    padding: theme.spacing(4, 8),
    [theme.breakpoints.only("sm")]: {
      margin: "0 15%",
      padding: theme.spacing(4, 6)
    },
    [theme.breakpoints.only("xs")]: {
      margin: "0 5%",
      padding: theme.spacing(2, 4)
    }
  },
  date: {
    fontSize: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem"
    }
  },
  quote: {
    fontSize: "2rem",
    color: theme.palette.primary.dark,
    padding: theme.spacing(2),
    [theme.breakpoints.only("xs")]: {
      fontSize: "1.7rem"
    },
    "&:before, &:after": {
      content: "''",
      border: "1px solid " + theme.palette.secondary.main,
      width: "100%",
      display: "block"
    }
  },
  author: {
    fontSize: "1.3rem",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.18rem"
    }
  },
  svgQuoteUp: {
    width: "100%",
    textAlign: "end",
    transform: "rotateZ(180deg)"
  },
  svgQuoteDown: {
    width: "100%",
    textAlign: "end"
  }
}));

// The function returns a string of date in the format "yyyy-mm-dd"
const getTodaysDate = () => {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString();
  const day = today.getDate().toString();
  const formattedDay = day.length === 1 ? "0" + day : day;

  return [year, month, formattedDay].join("-");
};

export default function QuoteOfTheDay() {
  const classes = useStyles();

  // Declare state variable qod, quote of the day, initialize as an object
  const [qod, setQod] = useState({});

  useEffect(() => {
    const localStorageKeys = {
      quote: "quote-of-the-day",
      author: "author",
      date: "last-quote-date"
    };
    let lastQuoteDate = window.localStorage.getItem(localStorageKeys.date);

    const fetchData = async () => {
      const result = await axios.get("http://quotes.rest/qod.json", {
        mode: "cors"
      });
      const quote = result.data.contents.quotes[0].quote;
      const author = result.data.contents.quotes[0].author;
      const date = result.data.contents.quotes[0].date;
      console.log("Newest date is => " + quote + author + date);
      // Update the state object with fetched data
      setQod({
        quote: quote,
        author: author,
        date: date
      });

      // Save a copy of the fetched data in the localStorage object
      window.localStorage.setItem(localStorageKeys.quote, quote);
      window.localStorage.setItem(localStorageKeys.author, author);
      window.localStorage.setItem(localStorageKeys.date, date);
    };

    const readDataFromLocal = () => {
      const quote = window.localStorage.getItem(localStorageKeys.quote);
      const author = window.localStorage.getItem(localStorageKeys.author);
      const date = window.localStorage.getItem(localStorageKeys.date);

      // Update the state object with fetched data
      setQod({
        quote: quote,
        author: author,
        date: date
      });
    };

    if (lastQuoteDate === null) {
      // Need to retrieve new quote
      console.log("no local data, fetching new data => ");
      fetchData();
    } else {
      console.log("Found local data");
      // Check the last quote date againt today's date
      console.log("Today => " + getTodaysDate());
      if (lastQuoteDate === getTodaysDate()) {
        console.log("Already got today's data, reading from local");
        // No need to retrieve today's quote again. Read quote from localStorage
        readDataFromLocal();
      } else {
        // Need to update a new quote
        console.log("Data is not newest, fetching new data");
        fetchData();
      }
    }
  }, []);

  return (
    <Paper className={classes.root} id='quoteSection'>
      <div className={classes.svgQuoteUp}>
        <FormatQuoteOutlinedIcon fontSize='large' color='secondary' />
      </div>
      <HeadingH2 title='Quote of the day' />
      <Typography component='p' className={classes.date}>
        {qod.date}
      </Typography>
      <Typography component='p' className={classes.quote}>
        {qod.quote}
      </Typography>
      <Typography component='p' className={classes.author}>
        {qod.author}
      </Typography>
      <AttributionToQuotesAPI />
      <div className={classes.svgQuoteDown}>
        <FormatQuoteOutlinedIcon fontSize='large' color='secondary' />
      </div>
    </Paper>
  );
}
