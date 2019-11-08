import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import MenuIcon from "@material-ui/icons/Menu";

import { Link, useParams } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "4rem"
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  },
  listItem: {
    textAlign: "center",
    justifyContent: "center",
    whiteSpace: "nowrap"
  },
  linkText: {
    color: theme.palette.text.secondary,
    fontFamily: "Caveat, Roboto, Helvetica, Arial, sans-serif",
    fontSize: "1.5rem",
    textDecorationLine: "none",
    cursor: "pointer",
    position: "relative",
    "&:after": {
      content: "''",
      display: "block",
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "2px",
      backgroundColor: theme.palette.secondary.main,
      transition: "all 0.3s ease",
      borderRadius: theme.spacing(1),
      transform: "rotateY(90deg)"
    },
    "&:hover": {
      "&:after": {
        transform: "rotateY(0deg)"
      }
    }
  }
}));

export default function TopNavBar() {
  const classes = useStyles();
  let { page } = useParams();
  console.log("page => " + page);

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='Click the button to open menu'
          >
            <MenuIcon />
          </IconButton>
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
            <ListItem className={classes.listItem}>
              <Link to='/' className={classes.linkText}>
                Home
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link to='/aboutme' className={classes.linkText}>
                About me
              </Link>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Link to='/whoisthis' className={classes.linkText}>
                Who is this
              </Link>
            </ListItem>
          </List>
        </Toolbar>
      </AppBar>
    </div>
  );
}
