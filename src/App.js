import React from "react";
import { Switch, Route } from "react-router-dom";

// Material-ui
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

// Import components
import TopNavBar from "./components/TopNavBar";

// Import Routes
import Home from "./components/Route/Home";
import Aboutme from "./components/Route/Aboutme";
import Whoisthis from "./components/Route/Whoisthis";
import PageNotFound from "./components/Route/PageNotFound";

// Import weather icons
import "./dist/wu-icons-style.css";
import "./App.css";

const customTheme = createMuiTheme({
  palette: {
    primary: { main: blue[700] }
  },
  typography: {
    fontFamily: "Caveat, Roboto, Helvetica, Arial, sans-serif"
  }
});

const useStyles = makeStyles(theme => ({
  mainSection: {
    width: "100%",
    height: "calc(100vh - 4rem)",
    maxWidth: "100%",
    maxHeight: "100%"
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
            <Route path='*'>
              <PageNotFound />
            </Route>
          </Switch>
        </main>
      </ThemeProvider>
    </div>
  );
}
