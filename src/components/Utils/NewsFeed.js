import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

// Import components
import NewsCard from "../NewsCard";
import SearchForm from "../SearchForm";

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(2, 0),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4, 6)
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 0, 8)
    }
  },
  item: {
    width: "100%",
    maxWidth: "100%"
  },
  container: {
    maxWidth: "100%",
    margin: theme.spacing(0, 0, 3)
  },
  messageNoResults: {
    padding: theme.spacing(1, 2),
    fontSize: "1.5rem",
    color: theme.palette.secondary.main,
    textAlign: "center",
    width: "100%"
  }
}));

export default function NewsFeed() {
  const classes = useStyles();
  const defaultSettings = {
    q: window.localStorage.getItem("q") || "News",
    sortBy: window.localStorage.getItem("sortBy") || "publishedAt",
    domains: window.localStorage.getItem("domains") || "",
    qInTitle: window.localStorage.getItem("qInTitle") || "false"
  };

  // Store user's preferences into localStorage
  window.localStorage.setItem("q", defaultSettings.q);
  window.localStorage.setItem("qInTitle", defaultSettings.qInTitle);
  window.localStorage.setItem("domains", defaultSettings.domains);
  window.localStorage.setItem("sortBy", defaultSettings.sortBy);

  const [q, setQ] = useState(defaultSettings.q);
  const [sortBy, setSortBy] = useState(defaultSettings.sortBy);
  const [domains, setDomains] = useState(defaultSettings.domains);
  const [qInTitle, setQInTitle] = useState(defaultSettings.qInTitle);

  const [apiUrl, setApiUrl] = useState("");

  // Build API url based on the query parameters
  useEffect(() => {
    const baseUrl = "https://newsapi.org/v2/everything?";
    const pageSize = 100;
    const defaultLanguage = "en";

    if (q) {
      const queryQ = qInTitle === "true" ? "qInTitle=" + q : "q=" + q;
      const queryPageSize = "pageSize=" + pageSize;
      const queryLanguage = `language=${defaultLanguage}`;
      const querySortBy = `sortBy=${sortBy}`;
      const queryDomains = domains ? `domains=${domains}` : null;

      setApiUrl(
        baseUrl +
          [queryQ, queryPageSize, queryLanguage, querySortBy, queryDomains]
            .filter(item => item !== null)
            .join("&")
      );
    }
  }, [q, qInTitle, sortBy, domains]);

  function reducerForArticles(articles, action) {
    if (action.newArticles && action.newArticles.length > 0) {
      return articles.concat(action.newArticles);
    }
    return action.newArticles;
  }
  const [articles, dispatch] = useReducer(reducerForArticles, []);
  const [isSearching, setIsSearching] = useState(false);

  // The Effect of fetching news from API
  useEffect(() => {
    setIsSearching(true);
    dispatch({ newArticles: [] });
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
          const articlesCount = response.data.articles.length;

          if (articlesCount) {
            dispatch({ newArticles: response.data.articles });
          }
          setIsSearching(false);
        })
        .catch(error => {
          // Handle error message
          console.log("X => ", error);
          setIsSearching(false);
        });
    } else {
      // API must have q parameter. Alert user to enter a keyword
      setIsSearching(false);
    }
  }, [apiUrl]);

  // Based on fetched data, generate news cards
  const BuildNewsCards = () => {
    if (articles.length > 0) {
      let count = 0;

      return articles.map(article => {
        count += 1;
        return (
          <Grid
            item
            sm={12}
            md={6}
            lg={4}
            xl={3}
            className={classes.item}
            key={count}
          >
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

    return (
      <Typography className={classes.messageNoResults}>
        No articles found
      </Typography>
    );
  };

  return (
    <section className={classes.root} id="newsSection">
      <SearchForm
        defaultKeyword={defaultSettings.q}
        setSearchWord={setQ}
        defaultDomains={defaultSettings.domains}
        setSearchDomains={setDomains}
        defaultIfSearchInTitle={defaultSettings.qInTitle}
        setIfSearchInTitle={setQInTitle}
        defaultSortBy={defaultSettings.sortBy}
        setSortBy={setSortBy}
      />
      {isSearching ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={5} className={classes.container}>
          <BuildNewsCards />
        </Grid>
      )}
    </section>
  );
}
