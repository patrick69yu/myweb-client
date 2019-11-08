import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import NavLink from "./NavLink";

import MenuIcon from "@material-ui/icons/Menu";

import { useLocation } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "4rem"
  },
  menuButton: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  title: {
    flexGrow: 1,
    fontSize: "2rem",
    fontFamily: "Monoton, Roboto, Helvetica, Arial, sans-serif",
    color: theme.palette.secondary.light
  },
  navList: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

export default function TopNavBar() {
  const classes = useStyles();
  let location = useLocation();
  let pathname = location.pathname;

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography className={classes.title}>After Coffee</Typography>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='Click the button to open menu'
          >
            <MenuIcon />
          </IconButton>
          <List className={classes.navList}>
            <NavLink to='/' title='Home' pathname={pathname} />
            <NavLink to='/aboutme' title='About me' pathname={pathname} />
            <NavLink to='/whoisthis' title='Who is this' pathname={pathname} />
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
}
