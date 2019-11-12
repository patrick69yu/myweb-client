import React, { useState } from "react";

// Material-ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";

// Import components
import NavLinkDesktop from "./NavLinkDesktop";
import NavLinkMobile from "./NavLinkMobile";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "4rem"
  },
  appBar: {
    backgroundColor: "#FFF"
  },
  toolBar: {
    height: "4rem",
    minHeight: "4rem"
  },
  menuButton: {
    display: "none",
    border: 0,
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  title: {
    flexGrow: 1,
    fontSize: "2rem",
    fontFamily: "Monoton, Helvetica, Arial, sans-serif",
    color: theme.palette.primary.main,
    fontWeight: "bold"
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
  const availableRoutes = [
    {
      title: "Home",
      to: "/"
    },
    {
      title: "About me",
      to: "/aboutme"
    },
    {
      title: "Who is this",
      to: "/whoisthis"
    }
  ];
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography className={classes.title}>After Coffee</Typography>
          <List className={classes.navList}>
            {availableRoutes.map((route, key) => (
              <NavLinkDesktop key={key} to={route.to} title={route.title} />
            ))}
          </List>
          <IconButton
            aria-controls='navMenuMobile'
            aria-haspopup='true'
            onClick={handleClick}
            edge='start'
            className={classes.menuButton}
            aria-label='Click the button to open menu'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='navMenuMobile'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {availableRoutes.map((route, key) => (
              <MenuItem onClick={handleClose} key={key}>
                <NavLinkMobile to={route.to} title={route.title} />
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
