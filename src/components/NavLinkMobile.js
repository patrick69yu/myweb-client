import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  linkText: {
    color: theme.palette.primary.main,
    fontFamily: "Caveat, Roboto, Helvetica, Arial, sans-serif",
    fontSize: "1.3rem",
    textDecorationLine: "none",
    position: "relative",
    padding: theme.spacing(0, 1),
    width: "100%",
    "&.active": {
      backgroundColor: theme.palette.primary.main,
      color: "#FFF"
    }
  }
}));

export default function NavLinkMobile(props) {
  const classes = useStyles();
  const { to, title } = props;
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Link
      to={to}
      className={classes.linkText + (pathname === to ? " active" : "")}
    >
      {title}
    </Link>
  );
}

NavLinkMobile.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
