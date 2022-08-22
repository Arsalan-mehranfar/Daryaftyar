import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  Card,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import NavigationIcon from "@mui/icons-material/Navigation";
import { fetchCardDataFinal } from "../Redux/CardApi/CardApiFinalAction";
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
    background: "rgb(72, 122, 58)",
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
  },
}));
const CartFinal = () => {
  const [url, setUrl] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartFinalData = useSelector((state) => state.cartFinalState);
  useEffect(() => {
    dispatch(fetchCardDataFinal(341393410));
  }, []);
  const { cart_details, pay_permission, wallet } = cartFinalData?.result;
  const { credit_discount_final, final_price, total_price_of_items } =
    cart_details || {};
  const { credit } = wallet || {};
  const classes = useStyles();
  const payHandler = () => {
    const fetchApi = async () => {
      const response = await axios.get(
        "http://Daryaftyar.ir/store/pay/request/id:341393410"
      );
      const data = await response.data;
      setUrl(data);
    };
    fetchApi();
  };
  useEffect(() => {
    const urlToGo = Object.values(url)[0];
    if (urlToGo) {
      window.location.href = urlToGo;
    }
  }, [url]);
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
          <Typography variant="h4">سبد خرید</Typography>
        </Grid>
        <Grid item xs={6} className={classes.headerStyle}>
          <NavigationIcon className={classes.iconStyle} />
        </Grid>
      </Grid>
      <Grid item xs={12} container className={classes.explainStyle}>
        <Grid item className={classes.leftSide} xs={6}>
          <Button
            className={classes.btn}
            variant="contained"
            onClick={() => navigate("/card", { replace: true })}
          >
            مشاهده
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.rightSide}>
          <Typography variant="body2" className={classes.txtStyle}>
            محصول در سبد خرید شما موجود است {3}
          </Typography>
        </Grid>
      </Grid>
      <Grid container xs={12} item className={classes.warningContainer}>
        <Grid item xs={12} className={classes.warningParagerph}>
          <Typography variant="body2" className={classes.warningStyle}>
            نکته مهم :شما باید قبلا در ربات و از بخش اطلاعات پستی،اطلاعات حقیقی
            خود را ثبت کرده باشید تا ما بتوانیم محصولات رو ارسال کنیم اگر این
            کار را نکرده اد اجازه پرداخت نخواهید داشت
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container className={classes.priceContainer}>
        <Grid item xs={12} className={classes.paymentContainer}>
          <Box className={classes.priceStyle}>
            <Grid itex xs={12}>
              <Typography variant="body2" className={classes.textPrice}>
                {total_price_of_items}:مجموع قیمت سبد خرید شما
              </Typography>
            </Grid>
            <Grid itex xs={12}>
              <Typography variant="body2" className={classes.textPrice}>
                {credit_discount_final} : تخفیف
              </Typography>
            </Grid>
            <Grid itex xs={12}>
              <Typography variant="body2" className={classes.textPrice}>
                {credit} : اعتبار کارت
              </Typography>
            </Grid>
            <Grid itex xs={12} className={classes.finalPriceContainer}>
              <Typography variant="body2" className={classes.textPrice}>
                {final_price} : پرداختی
              </Typography>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {pay_permission && (
        <>
          <Grid item xs={12} className={classes.sortStyle} onClick={payHandler}>
            <Card className={classes.sortContainer}>
              <Grid className={classes.sort} container>
                <NavigationIcon className={classes.sortIcone} />
                <Typography variant="body2" className={classes.parageraphStyle}>
                  {final_price} : پرداختی
                </Typography>
              </Grid>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CartFinal;
