import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  makeStyles,
  Badge,
  Grid,
  Box,
  Typography,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  customBadge: {
    backgroundColor: "green",
    color: "white",
    transform: "translate(-10px,-5px)",
  },
  imageStyle: {
    height: theme.spacing(15),
    width: theme.spacing(15),
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
  },
  container: {
    margin: theme.spacing(2),
    background: "rgb(199,190,110)",
    height: theme.spacing(35),
    width: theme.spacing(30),
    borderRadius: "50px",
  },
  boxStyle: {
    background: "rgb(147,118,0)",
    width: theme.spacing(20),
    height: theme.spacing(8),
    top: "80%",
    left: "50%",
    transform: "translate(-50%,-40%)",
    position: "absolute",
    borderRadius: "50px",
  },
  imageContainer: {
    position: "relative",
  },
  txtContainer: {
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
  textStyle: {
    color: "rgb(232,232,166)",
  },
  priceStyle: {
    color: "rgb(160,130,0)",
    fontSize: "12px",
    fontWeight: "bold",
  },
  discountedPriceStyle: {
    color: "rgb(160,130,0)",
    fontSize: "12px",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  realPrice: {
    textAlign: "center",
  },
  nameStyle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "rgb(160,130,0)",
  },
  negContainer: {
    textAlign: "center",
  },
  posContainer: {
    textAlign: "center",
  },
  negBtn: {
    borderRadius: "10px",
    textAlign: "center",
    border: "none",
    width: theme.spacing(7),
    height: theme.spacing(4),
    background: "rgb(232,60,60)",
    color: "rgb(232,232,166)",
    fontSize: "30px",
  },
  posBtn: {
    borderRadius: "10px",
    textAlign: "center",
    border: "none",
    width: theme.spacing(7),
    height: theme.spacing(4),
    background: "rgb(72,122,58)",
    color: "rgb(232,232,166)",
    fontSize: "30px",
  },
}));
const BookDisplay = ({
  name,
  image_sml,
  price,
  pub,
  discounted_price,
  id,
  count_in_user_cart,
  grade,
  major,
  publish,
  sort,
  numInCartHandler,
  posHandler,
}) => {
  const [hasBargain, setHasBargain] = useState(false);
  const navigate = useNavigate();
  const getDetailsHandler = useCallback((id) => {
    navigate(`/books/${id}`, { replace: true });
  }, []);
  const [itemCount, setItemCount] = useState(count_in_user_cart);
  const incrementHandler = () => {
    axios({
      method: "post",
      url: `http://Daryaftyar.ir/store/bookslist/id:${341393410}-grade:${grade}-major:${major}-pub:${publish}-sort:${sort}`,
      headers: {},
      data: {
        bid_in_cart: `+|${id}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setItemCount(itemCount + 1);
    posHandler(true);
    numInCartHandler();
  };
  const decrementHandler = () => {
    setItemCount(itemCount - 1);
    posHandler(false);
    numInCartHandler();
    axios({
      method: "post",
      url: `http://Daryaftyar.ir/store/bookslist/id:${341393410}-grade:${grade}-major:${major}-pub:${publish}-sort:${sort}`,
      data: {
        bid_in_cart: `-|${id}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setHasBargain(!(price === discounted_price));
  }, []);
  const classes = useStyles();
  return (
    <>
      <Badge
        classes={itemCount > 0 && { badge: classes.customBadge }}
        className={classes.container}
        badgeContent={itemCount > 0 && itemCount}
      >
        <Grid container className={classes.specificContainer}>
          <Grid
            item
            xs={12}
            className={classes.imageContainer}
            onClick={() => getDetailsHandler(id)}
          >
            <Box className={classes.boxStyle} />
            <Avatar
              className={classes.imageStyle}
              variant="square"
              alt="book-image"
              src={image_sml}
            />
          </Grid>
          <Grid item xs={12} className={classes.txtContainer}>
            <Typography variant="body2" className={classes.textStyle}>
              {pub}:انتشارات
            </Typography>
            <Typography variant="body2" className={classes.nameStyle}>
              {name}
            </Typography>
          </Grid>
          <Grid item xs={12} container className={classes.priceContainer}>
            {hasBargain ? (
              <>
                <Grid item xs={6} className={classes.realPrice}>
                  <Typography variant="body2" className={classes.priceStyle}>
                    {Math.round(price)} تومان
                  </Typography>
                </Grid>
                <Grid item xs={6} className={classes.realPrice}>
                  <Typography
                    variant="body2"
                    className={classes.discountedPriceStyle}
                  >
                    {Math.round(discounted_price)} تومان
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} className={classes.realPrice}>
                  <Typography variant="body2" className={classes.priceStyle}>
                    {Math.round(price)} تومان
                  </Typography>
                </Grid>
              </>
            )}
          </Grid>
          <Grid container item xs={12} className={classes.btnContainer}>
            {itemCount > 0 ? (
              <>
                <Grid item xs={6} className={classes.posContainer}>
                  <button onClick={incrementHandler} className={classes.posBtn}>
                    +
                  </button>
                </Grid>
                <Grid item xs={6} className={classes.negContainer}>
                  <button onClick={decrementHandler} className={classes.negBtn}>
                    -
                  </button>
                </Grid>
              </>
            ) : (
              <Grid item xs={12} className={classes.posContainer}>
                <button onClick={incrementHandler} className={classes.posBtn}>
                  +
                </button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Badge>
    </>
  );
};

export default BookDisplay;
