import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooksController } from "../Redux/BooksApi/booksApiAction";
import { Typography, Grid, Card, makeStyles } from "@material-ui/core";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import NavigationIcon from "@mui/icons-material/Navigation";
import BookDisplay from "./BookDisplay";
import { Link, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  headerStyle: {
    color: "rgb(147, 118, 0)",
    textAlign: "right",
    marginTop: theme.spacing(4),
  },
  iconStyle: {
    marginRight: theme.spacing(4),
    transform: "rotate(90deg)",
  },
  sortStyle: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  txtStyle: {
    textAlign: "right",
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
    marginRight: theme.spacing(3),
    fontSize: "25px",
  },
  sortContainer: {
    borderRadius: "50px",
  },
  groupbtnContainer: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  booksListContainer: {
    margin: theme.spacing(4),
  },
  bookStyle: {
    textAlign: "center",
  },
  linkStyle: {
    color: "rgb(147, 118, 0)",
    textDecoration: "none",
  },
  linkSortStyle: {
    textDecoration: "none",
    color: "rgb(232,232,166)",
  },
}));
const Book = ({ setNumItems }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const bookStore = useSelector((state) => state.userBooks);
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
  const sortParam = controlRadioGroup.empty ? 1 : controlRadioGroup.item.val;
  const name =
    controlRadioGroup.empty || controlRadioGroup.item.val === -1
      ? "هیچکدام"
      : controlRadioGroup.item.name;
  useEffect(() => {
    dispatch(
      fetchBooksController(
        341393410,
        gradeParam,
        majorParam,
        pubParam,
        sortParam
      )
    );
  }, []);
  const { general } = bookStore?.result;
  const { cart_items_count } = general || {};
  console.log(cart_items_count);
  useEffect(() => {
    setNumItems(cart_items_count);
  }, [bookStore]);
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item className={classes.headerContainer} xs={12} container>
          <Grid item xs={6} className={classes.headerStyle}>
            <Typography style={{ fontFamily: "IRANSans" }} variant="h4">
              کتاب ها
            </Typography>
          </Grid>
          <Grid item xs={6} className={classes.headerStyle}>
            <NavigationIcon
              className={classes.iconStyle}
              onClick={() => navigate(-1, { replace: true })}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.sortStyle}>
          <Card className={classes.sortContainer}>
            <Grid className={classes.sort} container>
              <Grid item xs={6} className={classes.icone}>
                <NavigationIcon className={classes.sortIcone} />
              </Grid>
              <Grid item xs={6} className={classes.txtStyle}>
                <Typography
                  style={{ fontFamily: "IRANSans" }}
                  ariant="body2"
                  className={classes.parageraphStyle}
                >
                  <Link
                    to="/books/sort"
                    style={{ fontFamily: "IRANSans" }}
                    className={classes.linkSortStyle}
                  >
                    مرتب سازی بر اساس :{name}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.groupbtnContainer}>
          <ToggleButtonGroup
            exclusive
            style={{ width: "35vw", height: "10vh" }}
          >
            <ToggleButton
              value="grade"
              style={{
                width: "33%",
                color: "rgb(147, 118, 0)",
                fontWeight: "bold",
                border: "4px solid rgb(147, 118, 0)",
                borderRadius: "50px 0 0 50px",
              }}
            >
              <Link
                to="/books/grade"
                style={{ fontFamily: "IRANSans" }}
                className={classes.linkStyle}
              >
                پایه (
                {gradeParam === -1
                  ? "همه"
                  : controlCheckBoxData.gradeFilter.items.length}
                )
              </Link>
            </ToggleButton>
            <ToggleButton
              value="major"
              style={{
                width: "33%",
                color: "rgb(147, 118, 0)",
                fontWeight: "bold",
                border: "4px solid rgb(147, 118, 0)",
              }}
            >
              <Link
                to="/books/major"
                style={{ fontFamily: "IRANSans" }}
                className={classes.linkStyle}
              >
                رشته (
                {majorParam === -1
                  ? "همه"
                  : controlCheckBoxData.majorFilter.items.length}
                )
              </Link>
            </ToggleButton>
            <ToggleButton
              value="publishes"
              style={{
                width: "33%",
                color: "rgb(147, 118, 0)",
                fontWeight: "bold",
                border: "4px solid rgb(147, 118, 0)",
                borderRadius: "0 50px 50px 0",
              }}
            >
              <Link
                to="/books/publishes"
                style={{ fontFamily: "IRANSans" }}
                className={classes.linkStyle}
              >
                انتشارات(
                {pubParam === -1
                  ? "همه"
                  : controlCheckBoxData.pubFilter.items.lenght}
                )
              </Link>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} className={classes.booksListContainer} container>
          {bookStore.result.books &&
            bookStore.result.books.map((el, index) => (
              <Grid item xs={4} className={classes.bookStyle}>
                <BookDisplay
                  {...el}
                  grade={gradeParam}
                  major={majorParam}
                  publish={pubParam}
                  sort={sortParam}
                  key={index}
                  setNumItems={setNumItems}
                  className={classes.books}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Book;
