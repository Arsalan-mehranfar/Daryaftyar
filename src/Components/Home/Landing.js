import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Card,
  Grid,
  makeStyles,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import NavigationIcon from "@mui/icons-material/Navigation";
const useStyles = makeStyles((theme) => ({
  container: {
    background: "rgb(147,118,0)",
    marginRight: theme.spacing(9),
    marginLeft: theme.spacing(9),
    borderRadius: "75px",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
  cardContainer: {
    margin: theme.spacing(4),
  },
  rightSideCard: {
    textAlign: "right",
    margin: "auto",
  },
  iconStyle: {
    transform: "rotate(-90deg)",
  },
  leftSideCard: {
    margin: "auto",
  },
  value: {
    color: "rgb(232,232,166)",
  },
  header: {
    color: "rgb(232,232,166)",
  },
  text: {
    color: "rgb(232,232,166)",
  },
  buttonContainer: {
    marginTop: theme.spacing(3),
  },
  btnContainer: {
    textAlign: "center",
  },
  btnStyle: {
    padding: theme.spacing(5),
    borderColor: "rgb(147,118,0)",
    color: "rgb(147,118,0)",
    borderRadius: "40px",
    borderWidth: "thick",
    fontWeight: "bold",
    fontSize: "25px",
    "&:hover": {
      color: "none",
      background: "none",
    },
  },
  lessons: {
    textAlign: "center",
  },
  lessonContainer: {
    marginTop: theme.spacing(4),
  },
  btnInside: {
    boxShadow: "none",
    color: "rgb(232,232,166)",
    background: "rgb(147,118,0)",
    padding: theme.spacing(2),
    marginTop: theme.spacing(2),
    borderRadius: "50px",
    "&:hover": {
      color: "rgb(232,232,166)",
      background: "rgb(147,118,0)",
      boxShadow: "none",
    },
  },
  txtStyle: {
    color: "rgb(147,118,0)",
    fontWeight: "bold",
  },
  btnOutSide: {
    width: theme.spacing(20),
    height: theme.spacing(22),
    background: "#C7BE6E",
    borderRadius: "65px",
    border: "none",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    marginBottom: theme.spacing(3),
    "&:hover": {
      color: "none",
      background: "#C7BE6E",
    },
  },
  insideBtn: {
    margin: theme.spacing(1),
  },
}));
const Landing = ({ wallet, general }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <div>
      {
        /*general?.have_active_cart && (*/
        <Card className={classes.container}>
          <CardContent
            className={classes.cardContainer}
            onClick={() => navigate("/wallet", { replace: true })}
          >
            <Grid container spacing={1}>
              <Grid item xs={6} className={classes.leftSideCard}>
                <Typography
                  variant="body2"
                  style={{ fontFamily: "IRANSans" }}
                  className={classes.value}
                >
                  <span>
                    <NavigationIcon className={classes.iconStyle} />
                  </span>
                  افزایش
                </Typography>
              </Grid>
              <Grid item xs={6} className={classes.rightSideCard}>
                <Typography
                  variant="h4"
                  style={{ fontFamily: "IRANSans" }}
                  className={classes.header}
                >
                  اعتبار کیف پول
                </Typography>
                <Typography
                  variant="body2"
                  style={{ fontFamily: "IRANSans" }}
                  className={classes.text}
                >
                  {wallet?.credit}تومان | {wallet?.get_expiration_time}روز مهلت
                  تا استفاده
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        /*)*/
      }
      <Grid container className={classes.buttonContainer}>
        <Grid item xs={6} className={classes.btnContainer}>
          <Button variant="outlined" className={classes.btnStyle}>
            <Link
              to="/classes"
              style={{
                fontFamily: "IRANSans",
                textDecoration: "none",
                color: "rgb(147, 118, 0)",
              }}
            >
              کلاس ها
            </Link>
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.btnContainer}>
          <Button variant="outlined" className={classes.btnStyle}>
            <Link
              to="/books"
              style={{
                fontFamily: "IRANSans",
                textDecoration: "none",
                color: "rgb(147, 118, 0)",
              }}
            >
              کتاب ها
            </Link>
          </Button>
        </Grid>
      </Grid>
      {/*<Grid container className={classes.lessonContainer}>
        <Grid item xs={4} className={classes.lessons}>
          <Button variant="outlined" className={classes.btnOutSide}>
            <Grid container className={classes.insideBtn}>
              <Grid item xs={12}>
                <Typography variant="body2" className={classes.txtStyle}>
                  بهترین های
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" className={classes.btnInside}>
                  ادبیات
                </Button>
              </Grid>
            </Grid>
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.lessons}>
          <Button variant="outlined" className={classes.btnOutSide}>
            <Grid container className={classes.insideBtn}>
              <Grid item xs={12}>
                <Typography variant="body2" className={classes.txtStyle}>
                  بهترین های
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" className={classes.btnInside}>
                  شیمی
                </Button>
              </Grid>
            </Grid>
          </Button>
        </Grid>
        <Grid item xs={4} className={classes.lessons}>
          <Button variant="outlined" className={classes.btnOutSide}>
            <Grid container className={classes.insideBtn}>
              <Grid item xs={12}>
                <Typography variant="body2" className={classes.txtStyle}>
                  بهترین های
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" className={classes.btnInside}>
                  فیزیک
                </Button>
              </Grid>
            </Grid>
          </Button>
        </Grid>
    </Grid>*/}
    </div>
  );
};

export default Landing;
