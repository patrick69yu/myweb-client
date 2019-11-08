import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const useStyles = makeStyles({});

export default function QuoteOfTheDay() {
  const classes = useStyles();

  // Declare state variable qod, quote of the day, initialize as an object
  const [qod, setQod] = useState({
    quote: "",
    author: "",
    date: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://quotes.rest/qod.json");

      setQod({
        quote: result.data.contents.quotes[0].quote,
        author: result.data.contents.quotes[0].author,
        date: result.data.contents.quotes[0].date
      });
    };

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Typography>Quote: {qod.quote}</Typography>
      <Typography>Author: {qod.author}</Typography>
      <Typography>Date: {qod.date}</Typography>
    </div>
  );
}
