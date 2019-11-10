import React, { useState, useEffect } from "react";
import axios from "axios";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

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
  }
}));

console.log("* My API KEY = " + process.env.REACT_APP_NEWSAPI_API_KEY);

export default function NewsFeed() {
  const classes = useStyles();

  const attributionToNewsAPI = () => {
    return (
      <p>
        Powered by <Link>NewsAPI.org</Link>
      </p>
    );
  };

  /**
   * Declare state variable
   * - @param: keyword, array, contains all keywords,
   * - @param: page, number, use to page through the results, start from 1
   * - @param: lang, string, indicates the preferred language, default: English
   * - @param: sortBy, string, indicates sorting condition,
   * - @param: appearInTitle, boolean, use q if false, or use qInTitle if true,
   * - @param: maxResultsPerPage, number, default 20, can be 20/40/60/80/100,
   * - @param: fromDate, string, publication starting date,
   * - @param: toDate, string, publication ending date
   * */

  const defaultLanguage = "en";
  const defaultPageSize = 20;

  const [requestParams, setPage] = useState({
    keyword: null,
    page: null,
    lang: defaultLanguage,
    sortBy: null,
    appearInTitle: false,
    pageSize: defaultPageSize,
    fromDate: null,
    toDate: null
  });

  function constructQueryParams() {
    const {
      keyword,
      page,
      lang,
      sortBy,
      appearInTitle,
      pageSize,
      fromDate,
      toDate
    } = requestParams;
    const queryKeywords =
      (appearInTitle ? "qInTitle=" : "q=") + keyword.join(" AND ");
    const queryPage = page ? "page=" + page : null;
    const queryLanguage = lang !== defaultLanguage ? "language=" + lang : null;
    const querySortBy = sortBy ? "sortBy=" + sortBy : null;
    const queryPageSize =
      pageSize > defaultPageSize ? "pageSize=" + pageSize : null;
    const queryFromDate = fromDate ? "from=" + fromDate : null;
    const queryToDate = toDate ? "to=" + toDate : null;

    return [
      queryKeywords,
      queryPage,
      queryLanguage,
      querySortBy,
      queryPageSize,
      queryFromDate,
      queryToDate
    ]
      .filter(item => item !== null)
      .join("&");
  }

  useEffect(() => {
    const apiUrl =
      "https://newsapi.org/v2/everything?" + constructQueryParams();

    const fetchData = async () => {
      const result = await axios.get(apiUrl);
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
    };
  }, []);

  return (
    <Paper className={classes.root}>
      <div className={classes.svgQuoteUp}>
        <FormatQuoteOutlinedIcon fontSize='large' color='secondary' />
      </div>
      <Typography component='h2' className={classes.title}>
        Quote of the day
      </Typography>
      <Typography component='p' className={classes.date}>
        {qod.date}
      </Typography>
      <Typography component='p' className={classes.quote}>
        {qod.quote}
      </Typography>
      <Typography component='p' className={classes.author}>
        {qod.author}
      </Typography>
      {componentQuoteReference()}
      <div className={classes.svgQuoteDown}>
        <FormatQuoteOutlinedIcon fontSize='large' color='secondary' />
      </div>
    </Paper>
  );
}
