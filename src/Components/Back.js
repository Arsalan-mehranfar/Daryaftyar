import React, { useEffect, useState } from "react";
import { Grid, Typography, makeStyles, Box, Card } from "@material-ui/core";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  headerStyle: {
    color: "rgb(147, 118, 0)",
    textAlign: "right",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  iconStyle: {
    marginRight: theme.spacing(4),
    transform: "rotate(90deg)",
  },
  rightSide: {
    textAlign: "right",
    color: "rgb(147,118,0)",
  },
  txtStyle: {
    marginRight: "5vw",
    fontSize: "18px",
    marginTop: theme.spacing(2),
  },
  btn: {
    marginLeft: "10vw",
    color: "rgb(232,232,166)",
    background: "rgb(147,118,0)",
    borderRadius: "50px",
  },
  explainStyle: {
    marginBottom: "3vw",
  },
  warningParagerph: {
    textAlign: "right",
    marginBottom: "4vw",
  },
  warningStyle: {
    color: "rgb(147,118,0)",
    fontSize: "18px",
    marginRight: "5vw",
    fontWeight: "bold",
  },
  paymentContainer: {
    textAlign: "center",
  },
  priceStyle: {
    border: "5px solid rgb(147,118,0)",
    textAlign: "right",
    padding: "3vw",
    marginRight: "4vw",
    marginLeft: "4vw",
    borderRadius: "50px",
  },
  textPrice: {
    color: "rgb(147,118,0)",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "1vw",
  },
  finalPriceContainer: {
    marginTop: "3vw",
  },
  priceContainer: {
    marginBottom: "2vw",
  },
  sort: {
    marginTop: "auto",
    marginBottom: "auto",
    background: "rgb(147, 118, 0)",
    color: "rgb(232,232,166)",
    padding: theme.spacing(4),
  },
  sortIcone: {
    marginLeft: theme.spacing(3),
    transform: "rotate(-90deg)",
  },
  parageraphStyle: {
    fontSize: "25px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  sortContainer: {
    borderRadius: "50px",
  },
  sortStyle: {
    marginBottom: "2vw",
    marginRight: "4vw",
    marginLeft: "4vw",
    cursor: "pointer",
    marginTop: "8vw",
  },
}));
const Back = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [RefID, setRefID] = useState("");
  //new values fill the states in bellow function
  useEffect(() => {
    setMessage("Hello Test");
    setStatus("Successfully");
    setRefID("156234");
  }, []);
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid
        item
        container
        className={classes.headerContainerBtn}
        wrap="nowrap"
        xs={12}
      >
        <Grid item xs={6} className={classes.headerStyle}>
          <Typography variant="h4" style={{ fontFamily: "IRANSans" }}>
            پایان خرید
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.headerStyle}>
          <NavigationIcon
            className={classes.iconStyle}
            onClick={() => navigate(-1, { replace: true })}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} container className={classes.priceContainer}>
        <Grid item xs={12} className={classes.paymentContainer}>
          <Box className={classes.priceStyle}>
            <Grid itex xs={12}>
              <Typography
                variant="body2"
                style={{ fontFamily: "IRANSans" }}
                className={classes.textPrice}
              >
                {message}:پیغام
              </Typography>
            </Grid>
            <Grid itex xs={12}>
              <Typography
                variant="body2"
                style={{ fontFamily: "IRANSans" }}
                className={classes.textPrice}
              >
                {status} : وضعیت
              </Typography>
            </Grid>
            <Grid itex xs={12}>
              <Typography
                variant="body2"
                style={{ fontFamily: "IRANSans" }}
                className={classes.textPrice}
              >
                {RefID} : شماسه پرداخت
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        className={classes.sortStyle}
        onClick={() => navigate("/", { replace: true })}
      >
        <Card className={classes.sortContainer}>
          <Grid className={classes.sort} container>
            <NavigationIcon className={classes.sortIcone} />
            <Typography
              variant="body2"
              style={{ fontFamily: "IRANSans" }}
              className={classes.parageraphStyle}
            >
              بازگشت به خانه
            </Typography>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Back;
