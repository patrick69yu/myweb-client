import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
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
    padding: theme.spacing(0, 1),
    "&:after": {
      content: "''",
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
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
    },
    "&.active": {
      "&:after": {
        transform: "rotateY(0deg)"
      }
    }
  }
}));

export default function NavLink(props) {
  const classes = useStyles();
  const { to, title, pathname } = props;

  return (
    <ListItem className={classes.listItem}>
      <Link
        to={to}
        className={classes.linkText + (pathname === to ? " active" : "")}
      >
        {title}
      </Link>
    </ListItem>
  );
}
