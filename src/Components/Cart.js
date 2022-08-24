import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardData } from "./Redux/CardApi/CardApiAction";
import { Grid, Typography, Card, makeStyles } from "@material-ui/core";
import NavigationIcon from "@mui/icons-material/Navigation";
import CardItem from "./CardItem/CardItem";
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
  textContainer: {
    textAlign: "right",
    marginTop: theme.spacing(4),
  },
  explainStyle: {
    fontSize: "24px",
    color: "rgb(147,118,0)",
    fontWeight: "bold",
    marginRight: "5vw",
  },
  itemInCartContainer: {
    margin: theme.spacing(4),
  },
  eachItemStyle: {
    textAlign: "center",
  },
  nullexplainStyle: {
    fontSize: "24px",
    color: "rgb(147,118,0)",
    fontWeight: "bold",
    marginRight: "5vw",
    marginBottom: "25vw",
  },
  sortStyle: {
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
}));
const Cart = ({ setNumItems }) => {
  const navigate = useNavigate();
  const [numItem, setNumItem] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartState);
  useEffect(() => {
    dispatch(fetchCardData(341393410));
  }, [numItem]);
  const { books_in_cart, general } = cartData?.result;
  const { cart_items_count } = general || {};
  const existanceInCart = books_in_cart?.length;
  const onClickCallBack = () => {
    setNumItem(existanceInCart);
  };
  const nextLevelHandler = () => {
    navigate("/card/final", { replace: true });
  };
  useEffect(() => {
    setNumItems(cart_items_count);
  }, [cartData]);
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
            سبد خرید
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.headerStyle}>
          <NavigationIcon
            className={classes.iconStyle}
            onClick={() => navigate(-1, { raplace: true })}
          />
        </Grid>
      </Grid>
      {existanceInCart > 0 ? (
        <>
          <Grid item xs={12} className={classes.textContainer}>
            <Typography
              variant="body2"
              style={{ fontFamily: "IRANSans" }}
              className={classes.explainStyle}
            >
              {existanceInCart}محصول در سبد خرید شما موجود است
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            className={classes.itemInCartContainer}
            wrap="nowrap"
          >
            <Grid item xs={12} className={classes.eachItemStyle}>
              {books_in_cart.map((el, index) => (
                <CardItem
                  {...el}
                  onClickCallBack={onClickCallBack}
                  key={index}
                  num={index + 1}
                  setNumItems={setNumItems}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.sortStyle}>
            <Card className={classes.sortContainer} onClick={nextLevelHandler}>
              <Grid className={classes.sort} container>
                <NavigationIcon className={classes.sortIcone} />

                <Typography
                  variant="body2"
                  style={{ fontFamily: "IRANSans" }}
                  className={classes.parageraphStyle}
                >
                  مرحله بعد
                </Typography>
              </Grid>
            </Card>
          </Grid>
        </>
      ) : (
        <Grid item xs={12} className={classes.textContainer}>
          <Typography
            variant="body2"
            style={{ fontFamily: "IRANSans" }}
            className={classes.nullexplainStyle}
          >
            هیچ محصولی در سبد خرید شما موجود نیست
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default Cart;
