import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

// Import components
import { Switch, Route } from "react-router-dom";
import TopNavBar from "./components/TopNavBar";

// Import Routes
import Home from "./components/Route/Home";
import Aboutme from "./components/Route/Aboutme";
import Whoisthis from "./components/Route/Whoisthis";

// Import weather icons
import "./dist/wu-icons-style.css";
import "./App.css";

const customTheme = createMuiTheme({
  palette: {
    primary: { main: blue[700] },
    text: { secondary: "#FFF" }
  },
  typography: {
    fontFamily: "Caveat, Roboto, Helvetica, Arial, sans-serif",
    h1: {
      fontSize: "4rem",
      textAlign: "center",
      padding: "1rem"
    }
  }
});

const useStyles = makeStyles(theme => ({
  mainSection: {
    padding: theme.spacing(2, 0)
  }
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className='App'>
      <ThemeProvider theme={customTheme}>
        <TopNavBar />
        <main id='main' role='main' className={classes.mainSection}>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/aboutme'>
              <Aboutme />
            </Route>
            <Route path='/whoisthis'>
              <Whoisthis />
            </Route>
          </Switch>
        </main>
      </ThemeProvider>
    </div>
  );
}
