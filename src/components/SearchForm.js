import React, { useState, useEffect } from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "100%",
    padding: theme.spacing(0, 2, 2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  inputText: {
    fontSize: "1.5rem"
  },
  helperText: {
    fontSize: "1.1rem",
    textAlign: "left"
  },
  inputLabel: {
    fontSize: "1.5rem"
  },
  item: {
    width: "100%",
    maxWidth: "100%",
    padding: theme.spacing(0, 1, 1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  fieldset: {
    margin: theme.spacing(1)
  },
  searchButton: {
    padding: theme.spacing(1),
    fontSize: "1.2rem"
  },
  switchBox: {
    margin: theme.spacing(1)
  }
}));

export default function SearchForm(props) {
  const classes = useStyles();
  const {
    defaultKeyword,
    setSearchWord,
    defaultDomains,
    setSearchDomains,
    defaultIfSearchInTitle,
    setIfSearchInTitle,
    defaultSortBy,
    setSortBy,
    resetArticles
  } = props;

  const [keyword, setKeyword] = useState(defaultKeyword);
  let hasDefaultKeyword = defaultKeyword ? true : false;
  const [isKeywordSet, setIsKeywordSet] = useState(hasDefaultKeyword);

  const updateKeyword = event => {
    event.preventDefault();
    event.stopPropagation();

    setKeyword(event.target.value);
    event.target.value ? setIsKeywordSet(true) : setIsKeywordSet(false);
  };

  const [searchInTitle, setSearchInTitle] = useState(defaultIfSearchInTitle);

  const updateSearchInTitle = event => {
    setSearchInTitle(event.target.checked);
  };

  const [domains, setDomains] = useState(defaultDomains);

  const updateDomains = event => {
    event.preventDefault();
    event.stopPropagation();
    setDomains(event.target.value);
  };

  const [sortByOption, setSortByOption] = useState(defaultSortBy);

  const changeSortByOption = event => {
    setSortByOption(event.target.value);
  };

  const handleSearch = event => {
    event.preventDefault();
    event.stopPropagation();

    if (isKeywordSet) {
      resetArticles({ newArticles: [] });
      setSearchWord(keyword);
      setIfSearchInTitle(searchInTitle);
      setSearchDomains(domains);
      setSortBy(sortByOption);
    }
  };

  useEffect(() => {
    if (isKeywordSet) {
      resetArticles({ newArticles: [] });
      setSearchWord(keyword);
      setIfSearchInTitle(searchInTitle);
      setSearchDomains(domains);
      setSortBy(sortByOption);
    }
  }, [searchInTitle, sortByOption]);

  return (
    <form noValidate autoComplete="off" onSubmit={handleSearch}>
      <Grid container className={classes.container}>
        <Grid item sm={12} className={classes.item}>
          <FormControl
            className={classes.textField}
            required
            error={!isKeywordSet}
          >
            <InputLabel
              htmlFor="inputSearchKeyword"
              className={classes.inputLabel}
            >
              Search Keywords
            </InputLabel>
            <Input
              id="inputSearchKeyword"
              className={classes.inputText}
              value={keyword}
              onChange={updateKeyword}
            />
            <FormHelperText className={classes.helperText}>
              Accepts one or multiple keyword(s), use AND or OR to refine your
              search. Example: investments OR travel
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item sm={12} className={classes.item}>
          <FormControl className={classes.textField}>
            <InputLabel
              htmlFor="inputSourceDomains"
              className={classes.inputLabel}
            >
              Search Domains
            </InputLabel>
            <Input
              id="inputSourceDomains"
              className={classes.inputText}
              value={domains}
              onChange={updateDomains}
            />
            <FormHelperText className={classes.helperText}>
              Enter domain names, seperated by comma. Example: nytimes.com,
              globalnews.ca, medium.com
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item sm={12} className={classes.item}>
          <FormControlLabel
            control={
              <Switch
                checked={searchInTitle}
                onChange={updateSearchInTitle}
                value="searchInTitle"
              />
            }
            label="Keywords mentioned in title"
            classes={{ root: classes.switchBox, label: classes.inputText }}
          />
        </Grid>
        <Grid item sm={12} className={classes.item}>
          <FormControl component="fieldset" className={classes.fieldset}>
            <FormLabel component="legend">Sort By: </FormLabel>
            <RadioGroup
              aria-label="searching results sort by"
              name="sortBy"
              value={sortByOption || defaultSortBy}
              onChange={changeSortByOption}
            >
              <FormControlLabel
                value="relevancy"
                control={<Radio />}
                label="Relevancy"
                classes={{ label: classes.inputText }}
              />
              <FormControlLabel
                value="publishedAt"
                control={<Radio />}
                label="Most Recent"
                classes={{ label: classes.inputText }}
              />
              <FormControlLabel
                value="popularity"
                control={<Radio />}
                label="Popularity"
                classes={{ label: classes.inputText }}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item sm={12} className={classes.item}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.SearchButton}
            onClick={handleSearch}
            type="submit"
          >
            <Typography>Search</Typography>
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
