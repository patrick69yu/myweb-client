import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  loadMoreButton: {
    padding: theme.spacing(1, 2),
    fontSize: "1.1rem"
  },
  messageNoResults: {
    padding: theme.spacing(1, 2),
    fontSize: "1.5rem",
    color: theme.palette.secondary.main
  }
}));

export default function NewsFeed() {
  const classes = useStyles();
  const defaultSettings = {
    q: "Today's news",
    page: 1,
    sortBy: "relevancy",
    domains: "",
    qInTitle: false
  };

  const [q, setQ] = useState(defaultSettings.q);
  const [page, setPage] = useState(defaultSettings.page);
  const [sortBy, setSortBy] = useState(defaultSettings.sortBy);
  const [domains, setDomains] = useState(defaultSettings.domains);
  const [qInTitle, setQInTitle] = useState(defaultSettings.qInTitle);

  const [apiUrl, setApiUrl] = useState("");

  // Build API url based on the query parameters
  useEffect(() => {
    const baseUrl = "https://newsapi.org/v2/everything?";
    const defaultPage = 1;
    const defaultLanguage = "en";

    if (q) {
      const queryQ = qInTitle ? "qInTitle=" : "q=" + q;
      const queryPage = page > defaultPage ? "page=" + page : null;
      const queryLanguage = `language=${defaultLanguage}`;
      const querySortBy = `sortBy=${sortBy}`;
      const queryDomains = domains ? `domains=${domains}` : null;

      setApiUrl(
        baseUrl +
          [queryQ, queryPage, queryLanguage, querySortBy, queryDomains]
            .filter(item => item !== null)
            .join("&")
      );
    }
  }, [q, qInTitle, page, sortBy, domains]);

  const initialArticles = [];
  function reducerForArticles(articles, action) {
    if (action.newArticles && action.newArticles.length > 0) {
      return articles.concat(action.newArticles);
    }
    return action.newArticles;
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

    return <div>Nothing</div>;
  };

  const [isPageReachLimit, setIsPageReachLimit] = useState(false);
  const updatePageNum = event => {
    event.preventDefault();
    event.stopPropagation();

    const maxPageNum = 5;
    if (page < maxPageNum) {
      setPage(page + 1);
    } else {
      setIsPageReachLimit(true);
    }
  };

  const LoadMoreButton = () => {
    if (articles.length > 0) {
      return (
        <Button
          variant="contained"
          color="primary"
          className={classes.loadMoreButton}
          disabled={isPageReachLimit}
          onClick={updatePageNum}
        >
          Load more
        </Button>
      );
    }
    return (
      <Typography className={classes.messageNoResults}>
        No articles found. Please modify your serach.
      </Typography>
    );
  };

  const ReachLoadLimitErrMsg = () => {
    if (isPageReachLimit) {
      return (
        <ErrorMessage
          msg={
            "Each topic can only retrieve 100 results. Try search some other topics."
          }
        />
      );
    }
    return null;
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
        resetPageNumber={setPage}
        resetArticles={dispatch}
        resetPageLimit={setIsPageReachLimit}
      />
      <Grid container spacing={5} className={classes.container}>
        <BuildNewsCards />
      </Grid>
      <LoadMoreButton />
      <ReachLoadLimitErrMsg />
    </section>
  );
}

const useStylesErrMsg = makeStyles(theme => ({
  errorMessage: {
    color: theme.palette.error.main,
    padding: theme.spacing(1, 2)
  }
}));

const ErrorMessage = props => {
  const classes = useStylesErrMsg();
  return <Typography className={classes.errorMessage}>{props.msg}</Typography>;
};
