import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// Import components
import NewsCard from "../NewsCard";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(4, 0, 8),
    marginBottom: theme.spacing(8),
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(4, 6),
      marginBottom: theme.spacing(6)
    },
    [theme.breakpoints.only("xs")]: {
      padding: theme.spacing(2, 4),
      marginBottom: theme.spacing(4)
    }
  },
  title: {
    fontSize: "3.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem"
    }
  },
  container: {
    maxWidth: "100%",
    margin: theme.spacing(0, 0, 4)
  },
  loadMoreButton: {
    padding: theme.spacing(1, 2),
    fontSize: "1.1rem"
  }
}));

export default function NewsFeed() {
  const classes = useStyles();
  const defaultSettings = {
    q: ["nba"],
    page: 1,
    language: "en",
    sortBy: "publishedAt",
    qInTitle: false,
    pageSize: 20,
    from: "",
    to: ""
  };

  const [q, setQ] = useState(defaultSettings.q);
  const [page, setPage] = useState(defaultSettings.page);
  const [language, setLanguage] = useState(defaultSettings.language);
  const [sortBy, setSortBy] = useState(defaultSettings.sortBy);
  const [qInTitle, setQInTitle] = useState(defaultSettings.qInTitle);
  const [pageSize, setPageSize] = useState(defaultSettings.pageSize);
  const [fromDate, setFromDate] = useState(defaultSettings.from);
  const [toDate, setToDate] = useState(defaultSettings.to);

  const [apiUrl, setApiUrl] = useState("");
  // Build API url based on the query parameters
  useEffect(() => {
    const baseUrl = "https://newsapi.org/v2/everything?";
    const defaultPage = 1;
    const defaultPageSize = 20;

    if (q) {
      const queryQ = (qInTitle ? "qInTitle=" : "q=") + q.join(" AND ");

      const queryPage = page > defaultPage ? "page=" + page : null;

      const queryLanguage = "language=" + language;

      const querySortBy = "sortBy=" + sortBy;

      const queryPageSize =
        pageSize > defaultPageSize ? "pageSize=" + pageSize : null;

      const queryFromDate = fromDate ? "from=" + fromDate : null;

      const queryToDate = toDate ? "to=" + toDate : null;

      setApiUrl(
        baseUrl +
          [
            queryQ,
            queryPage,
            queryLanguage,
            querySortBy,
            queryPageSize,
            queryFromDate,
            queryToDate
          ]
            .filter(item => item !== null)
            .join("&")
      );
    }
  }, [q, page, language, sortBy, qInTitle, pageSize, fromDate, toDate]);

  const initialArticles = [];
  function reducerForArticles(articles, action) {
    if (action.newArticles) {
      return articles.concat(action.newArticles);
    }
    throw new Error();
  }
  const [articles, dispatch] = useReducer(reducerForArticles, initialArticles);

  // The Effect of fetching news from API
  useEffect(() => {
    if (apiUrl) {
      // If API URL at least has q parameter, fetch data from API
      axios
        .get(apiUrl, {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_NEWSAPI_API_KEY
          }
        })
        .then(response => {
          // Handle success response
          dispatch({ newArticles: response.data.articles });
        })
        .catch(error => {
          // Handle error message
          console.log("X => ", error);
        });
    } else {
      // API must have q parameter. Alert user to enter a keyword
    }
  }, [apiUrl]);

  // Based on fetched data, generate news cards
  const BuildNewsCards = () => {
    if (articles) {
      let count = 0;

      return articles.map(article => {
        count += 1;
        return (
          <Grid item sm={12} md={6} lg={4} xl={3} key={count}>
            <NewsCard
              number={count}
              title={article.title}
              author={article.author}
              date={article.publishedAt}
              imgUrl={article.urlToImage}
              description={article.description}
              newsUrl={article.url}
            />
          </Grid>
        );
      });
    }

    return null;
  };

  return (
    <section className={classes.root} id='newsSection'>
      <Grid container spacing={5} className={classes.container}>
        <BuildNewsCards />
      </Grid>
      <Button
        variant='contained'
        color='primary'
        className={classes.loadMoreButton}
        onClick={() => setPage(page + 1)}
      >
        Load more
      </Button>
    </section>
  );
}
