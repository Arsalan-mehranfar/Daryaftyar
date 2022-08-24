import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  Box,
  makeStyles,
  Avatar,
  Badge,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  customBadge: {
    backgroundColor: "green",
    color: "white",
    transform: "translate(10px,5px)",
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
  rightSide: {
    textAlign: "right",
  },
  text: {
    fontSize: "22px",
    color: "rgb(147,118,0)",
  },
  rightSideContainer: {
    textAlign: "right",
  },
}));
const CardItem = ({
  auther_name,
  image_med,
  price,
  id,
  count_in_user_cart,
  onClickCallBack,
  setNumItems,
  name,
}) => {
  const controlCheckBoxData = useSelector((state) => state.checkBoxState);
  const controlRadioGroup = useSelector((state) => state.sortState);
  const gradeParam = controlCheckBoxData.gradeFilter.allSelected
    ? -1
    : controlCheckBoxData.gradeFilter.items.sort((a, b) => a < b).join(".");
  const majorParam = controlCheckBoxData.majorFilter.allSelected
    ? -1
    : controlCheckBoxData.majorFilter.items.sort((a, b) => a < b).join(".");
  const pubParam = controlCheckBoxData.pubFilter.allSelected
    ? -1
    : controlCheckBoxData.pubFilter.items.sort((a, b) => a < b).join(".");
  const sortParam = controlRadioGroup.empty ? 1 : controlRadioGroup.item;
  const [itemCount, setItemCount] = useState(count_in_user_cart);
  const navigate = useNavigate();
  const incrementHandler = () => {
    axios({
      method: "post",
      url: `http://Daryaftyar.ir/store/bookslist/id:${341393410}-grade:${gradeParam}-major:${majorParam}-pub:${pubParam}-sort:${sortParam}`,
      headers: {},
      data: {
        bid_in_cart: `+|${id}`,
      },
    })
      .then((res) => setNumItems(res.data.general.cart_items_count))
      .catch((err) => console.log(err));
    setItemCount(itemCount + 1);
  };
  const decrementHandler = () => {
    axios({
      method: "post",
      url: `http://Daryaftyar.ir/store/bookslist/id:${341393410}-grade:${gradeParam}-major:${majorParam}-pub:${pubParam}-sort:${sortParam}`,
      headers: {},
      data: {
        bid_in_cart: `-|${id}`,
      },
    })
      .then((res) => setNumItems(res.data.general.cart_items_count))
      .catch((err) => console.log(err));
    setItemCount(itemCount - 1);
    itemCount === 1 && onClickCallBack();
  };
  const classes = useStyles();
  return (
    <>
      {itemCount > 0 && (
        <>
          <Grid container>
            <Grid item xs={6} className={classes.leftSideContainer}>
              <Badge
                classes={itemCount > 0 && { badge: classes.customBadge }}
                className={classes.container}
                badgeContent={itemCount > 0 && itemCount}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Grid container className={classes.specificContainer}>
                  <Grid
                    item
                    xs={12}
                    className={classes.imageContainer}
                    onClick={() => navigate(`/books/${id}`, { replace: true })}
                  >
                    <Box className={classes.boxStyle} />
                    <Avatar
                      className={classes.imageStyle}
                      variant="square"
                      alt="book-image"
                      src={image_med}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.txtContainer}>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        style={{ fontFamily: "IRANSans" }}
                        className={classes.textStyle}
                      >
                        انتشارات : دریافت
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        style={{ fontFamily: "IRANSans" }}
                        className={classes.nameStyle}
                      >
                        {name}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    container
                    className={classes.priceContainer}
                  >
                    <Grid item xs={12} className={classes.realPrice}>
                      <Typography
                        variant="body2"
                        style={{ fontFamily: "IRANSans" }}
                        className={classes.priceStyle}
                      >
                        {Math.round(price)} تومان
                      </Typography>
                    </Grid>
                    {/*<Grid item xs={6} className={classes.realPrice}>
                      <Typography
                        variant="body2"
                        className={classes.discountedPriceStyle}
                      >
                        {Math.round(price)} tomans
                      </Typography>
              </Grid>*/}
                  </Grid>
                  <Grid container item xs={12} className={classes.btnContainer}>
                    {itemCount > 0 ? (
                      <>
                        <Grid item xs={6} className={classes.posContainer}>
                          <button
                            onClick={incrementHandler}
                            className={classes.posBtn}
                          >
                            +
                          </button>
                        </Grid>
                        <Grid item xs={6} className={classes.negContainer}>
                          <button
                            onClick={decrementHandler}
                            className={classes.negBtn}
                          >
                            -
                          </button>
                        </Grid>
                      </>
                    ) : (
                      <Grid item xs={12} className={classes.posContainer}>
                        <button
                          onClick={incrementHandler}
                          className={classes.posBtn}
                        >
                          +
                        </button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Badge>
            </Grid>
            <Grid item xs={6} className={classes.rightSideContainer}>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  style={{ fontFamily: "IRANSans" }}
                  className={classes.text}
                >
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  style={{ fontFamily: "IRANSans" }}
                  className={classes.text}
                >
                  {auther_name}:نویسنده
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  style={{ fontFamily: "IRANSans" }}
                  className={classes.text}
                >
                  انتشارات : دریافت
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CardItem;
