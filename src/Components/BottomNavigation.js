import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  container: {
    background: "#AB8A00",
  },
  linkContainer: {
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "#E2E2A2",
    fontSize: "20px",
    "&:hover": {
      color: "yellow",
      textDecoration: "none",
    },
  },
  numStyle: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1),
    color: "black",
    background: "white",
    borderRadius: "60%",
  },
}));

function BottomNavigation({ numItems }) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.container}>
      <CssBaseline />
      <Toolbar>
        <Grid spacing={1} container>
          <Grid item xs={4} className={classes.linkContainer}>
            <Link
              to="/card"
              className={classes.link}
              style={{ fontFamily: "IRANSans" }}
            >
              سبد خرید
            </Link>
            {numItems > 0 && (
              <span className={classes.numStyle}>{numItems}</span>
            )}
          </Grid>
          <Grid item xs={4} className={classes.linkContainer}>
            <Link
              to="/"
              className={classes.link}
              style={{ fontFamily: "IRANSans" }}
            >
              خانه
            </Link>
          </Grid>
          <Grid item xs={4} className={classes.linkContainer}>
            <Link
              to="/bill"
              className={classes.link}
              style={{ fontFamily: "IRANSans" }}
            >
              صورتحساب
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
export default BottomNavigation;
