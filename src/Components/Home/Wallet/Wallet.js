import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Typography, makeStyles } from "@material-ui/core";
import { fetchWalletData } from "../../Redux/WalletApi/WalletApiAction";
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
  boxContainer: {
    textAlign: "center",
  },
  contentBox: {
    textAlign: "right",
    color: "rgb(232,232,166)",
    background: "rgb(147,118,0)",
    marginRight: "4vw",
    marginLeft: "4vw",
    borderRadius: "75px",
    padding: theme.spacing(5),
    height: "60vh",
    marginBottom: "18vh",
  },
  textContainer: {
    margin: theme.spacing(4),
  },
}));
const Wallet = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const walletData = useSelector((state) => state.walletState);
  useEffect(() => {
    dispatch(fetchWalletData(341393410));
  }, []);
  const { wallet } = walletData?.result;
  const { credit, get_expiration_time } = wallet || {};

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
            کیف پول
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.headerStyle}>
          <NavigationIcon
            className={classes.iconStyle}
            onClick={() => navigate("/", { replace: true })}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.contentContainer}>
        <Grid item xs={12} className={classes.boxContainer}>
          <Box className={classes.contentBox}>
            <Grid className={classes.textContainer}>
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
                className={classes.textStyle}
              >
                تومان{credit} | روز تا استفاده{get_expiration_time}
              </Typography>
            </Grid>
            <Grid className={classes.textContainer}>
              <Typography
                variant="body2"
                style={{ fontFamily: "IRANSans" }}
                className={classes.textStyle}
              >
                راه های افزایش اعتبار کیف پول
              </Typography>
            </Grid>
            <Grid className={classes.textContainer}>
              <Typography
                variant="body2"
                style={{ fontFamily: "IRANSans" }}
                className={classes.textStyle}
              >
                دوست خوبم از راه های زیر میتونی اعتبار کسب کنی و در خرید از این
                فروشگاه ازش استفاده کنی
              </Typography>
            </Grid>
            <Grid className={classes.textContainer}>
              <Typography
                variant="body2"
                style={{ fontFamily: "IRANSans" }}
                className={classes.textStyle}
              >
                با هر بار جواب دادن به سوال دوستات در پرسشکده ربات میتونی 500
                تومان اعتبار جکع کنی
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Wallet;
