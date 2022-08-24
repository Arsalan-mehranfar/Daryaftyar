import React from "react";
import { Typography, makeStyles, Grid } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    float: "right",
    margin: theme.spacing(3),
  },
  toRight: {
    float: "right",
    color: "#AB8A00",
  },
}));
const Header = ({ general }) => {
  const { name } = general;
  const classes = useStyles();
  return (
    <Grid className={classes.container}>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          style={{ fontFamily: "IRANSans" }}
          className={classes.toRight}
          style={{ fontFamily: "IRANSans" }}
        >
          سلام {name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          className={classes.toRight}
          style={{ fontFamily: "IRANSans" }}
        >
          ! به فروشگاه دریافت یار خوش امدید
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
