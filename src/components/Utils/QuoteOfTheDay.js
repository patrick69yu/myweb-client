import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({});

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
  const [qod, setQod] = useState({
    quote: "",
    author: "",
    date: ""
  });

  useEffect(() => {
    const localStorageKeys = {
      quote: "qod",
      author: "author",
      date: "last-qod-retrieved"
    };
    let lastQuoteDate = window.localStorage.getItem(localStorageKeys.date);

    const fetchData = async () => {
      const result = await axios.get("http://quotes.rest/qod.json");
      const quote = result.data.contents.quotes[0].quote;
      const author = result.data.contents.quotes[0].author;
      const date = result.data.contents.quotes[0].date;

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
      fetchData();
    } else {
      // Check the last quote date againt today's date
      if (lastQuoteDate === getTodaysDate()) {
        // No need to retrieve today's quote again. Read quote from localStorage
        readDataFromLocal();
      } else {
        // Need to update a new quote
        fetchData();
      }
    }
  }, []);

  return (
    <div className={classes.root}>
      <Typography>Quote: {qod.quote}</Typography>
      <Typography>Author: {qod.author}</Typography>
      <Typography>Date: {qod.date}</Typography>
    </div>
  );
}
