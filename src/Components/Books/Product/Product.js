import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGetDetailsController } from "../../Redux/ProductApi/getDetailsAction";
import { Grid, makeStyles, Typography, Box, Avatar } from "@material-ui/core";
import NavigationIcon from "@mui/icons-material/Navigation";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  headerStyle: {
    color: "rgb(147, 118, 0)",
    textAlign: "right",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  imageContainer: {
    position: "relative",
  },
  iconStyle: {
    marginRight: theme.spacing(4),
    transform: "rotate(90deg)",
  },
  detailContainer: {
    height: theme.spacing(45),
  },
  specificContainer: {
    margin: theme.spacing(2),
    background: "rgb(199,190,110)",
    borderRadius: "50px",
  },
  imageStyle: {
    height: theme.spacing(20),
    width: theme.spacing(20),
    marginTop: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: theme.spacing(10),
  },
  boxStyle: {
    background: "rgb(147,118,0)",
    width: theme.spacing(25),
    height: theme.spacing(10),
    top: "90%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    position: "absolute",
    borderRadius: "50px",
  },
  txtStyle: {
    color: "rgb(147,118,0)",
    fontSize: "18px",
    fontWeight: "bold",
  },
  priceStyle: {
    color: "rgb(160,130,0)",
    fontSize: "18px",
    fontWeight: "bold",
  },
  discountedPriceStyle: {
    color: "rgb(160,130,0)",
    fontSize: "18px",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  realPrice: {
    textAlign: "center",
  },
  explainContainer: {
    textAlign: "right",
    marginBottom: "auto",
    marginTop: "auto",
    marginRight: theme.spacing(10),
  },
  priceContainer: {
    marginTop: theme.spacing(4),
  },
  btnContainer: {
    textAlign: "center",
    marginTop: theme.spacing(16),
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
  txtContainer: {
    textAlign: "center",
    marginBottom: theme.spacing(3),
  },
  txtBtn: {
    color: "rgb(147,118,0)",
    fontSize: "16px",
    fontWeight: "bold",
  },
  btns: {
    marginBottom: theme.spacing(1),
  },
  posContainer: {
    textAlign: "center",
  },
  negContainer: {
    textAlign: "center",
  },
}));

const Product = ({ setNumItems }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const detailsInfo = useSelector((state) => state.getDetailsState);
  const filters = useSelector((state) => state.checkBoxState);
  const sortFilter = useSelector((state) => state.sortState);
  const gradeParam = filters.gradeFilter.allSelected
    ? -1
    : filters.gradeFilter.items.sort((a, b) => a < b).join(".");
  const majorParam = filters.majorFilter.allSelected
    ? -1
    : filters.majorFilter.items.sort((a, b) => a < b).join(".");
  const pubParam = filters.pubFilter.allSelected
    ? -1
    : filters.pubFilter.items.sort((a, b) => a < b).join(".");
  const sortParam = sortFilter.empty ? 1 : sortFilter.item;
  const { id } = useParams();
  useEffect(() => {
    dispatch(
      fetchGetDetailsController(
        341393410,
        gradeParam,
        majorParam,
        pubParam,
        sortParam,
        id
      )
    );
  }, []);
  const res = detailsInfo && detailsInfo?.result;
  const [hasBargain, setHasBargain] = useState(false);
  const { book, general } = res;
  const {
    image_big,
    name,
    details,
    price,
    count_in_user_cart,
    auther_name,
    pages_count,
    discounted_price,
  } = book ?? {};
  const [itemCount, setItemCount] = useState(
    count_in_user_cart ? count_in_user_cart : 0
  );
  const { cart_items_count } = general || {};
  useEffect(() => {
    setNumItems(cart_items_count);
  }, [detailsInfo]);
  useEffect(() => {
    setHasBargain(!(price === discounted_price));
  }, []);
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
  };
  return (
    <>
      {book && (
        <Grid container className={classes.container}>
          <Grid
            item
            container
            className={classes.headerContainerBtn}
            wrap="nowrap"
            xs={12}
          >
            <Grid item xs={6} className={classes.headerStyle}>
              <Typography style={{ fontFamily: "IRANSans" }} variant="h4">
                {name}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.headerStyle}>
              <NavigationIcon
                className={classes.iconStyle}
                onClick={() => navigate("/books", { replace: true })}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            wrap="nowrap"
            className={classes.detailContainer}
            xs={12}
          >
            <Grid item xs={6} className={classes.specificContainer}>
              <Grid item xs={12} className={classes.imageContainer}>
                <Box className={classes.boxStyle} />
                <Avatar
                  className={classes.imageStyle}
                  variant="square"
                  alt="book-image"
                  src={image_big}
                />
              </Grid>
              <Grid item xs={12} container className={classes.priceContainer}>
                {hasBargain ? (
                  <>
                    <Grid item xs={6} className={classes.realPrice}>
                      <Typography
                        style={{ fontFamily: "IRANSans" }}
                        variant="body2"
                        className={classes.priceStyle}
                      >
                        {Math.round(price)} تومان
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.realPrice}>
                      <Typography
                        style={{ fontFamily: "IRANSans" }}
                        variant="body2"
                        className={classes.discountedPriceStyle}
                      >
                        {Math.round(discounted_price)} تومان
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12} className={classes.realPrice}>
                    <Typography
                      variant="body2"
                      style={{ fontFamily: "IRANSans" }}
                      className={classes.priceStyle}
                    >
                      {Math.round(price)} تومان
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.explainContainer}>
              <Typography
                style={{ fontFamily: "IRANSans" }}
                variant="body2"
                className={classes.txtStyle}
              >
                نویسنده : {auther_name}
              </Typography>
              <Typography
                variant="body2"
                style={{ fontFamily: "IRANSans" }}
                className={classes.txtStyle}
              >
                تعداد صفحات : {pages_count}
              </Typography>
              <Typography
                style={{ fontFamily: "IRANSans" }}
                variant="body2"
                className={classes.txtStyle}
              >
                :توضیحات
              </Typography>
              <Typography
                variant="body2"
                style={{ fontFamily: "IRANSans" }}
                className={classes.txtStyle}
              >
                {details}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.btnContainer}>
            <Grid item xs={12} className={classes.txtContainer}>
              {itemCount > 0 && (
                <>
                  <Typography
                    variant="body2"
                    style={{ fontFamily: "IRANSans" }}
                    className={classes.txtBtn}
                  >
                    ({itemCount}تعداد)این محصول در سبد خرید شما موجود است
                  </Typography>
                </>
              )}
            </Grid>

            <Grid container item xs={12} className={classes.btns}>
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
                  <button onClick={incrementHandler} className={classes.posBtn}>
                    +
                  </button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Product;
