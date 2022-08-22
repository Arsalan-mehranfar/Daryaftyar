import React, { useEffect, useRef, useCallback } from "react";
import { Grid, makeStyles, Typography, Card } from "@material-ui/core";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSortsFilterController } from "../../Redux/FilterApi/SortAction";
import { addItemSort } from "../../Redux/FilterControlData/radioGroupAction";
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
  ckeckBoxItem: {
    textAlign: "right",
    marginRight: theme.spacing(15),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  checkBoxLabelContainer: {
    display: "block",
    position: "relative",
    paddingLeft: "35px",
    marginBottom: "12px",
    cursor: "pointer",
    fontSize: "22px",
    color: "rgb(147,118,0)",
    fontWeight: "bold",
  },
  inputCheckBox: {
    marginRight: theme.spacing(5),
    opacity: "0",
    cursor: "pointer",
    height: "0",
    width: "0",
    "&:checked~$checkmark": {
      background: "rgb(147,118,0)",
    },
  },
  checkmark: {
    display: "inline-block",
    height: "20px",
    width: "30px",
    backgroundColor: "rgb(232,232,166)",
    borderRadius: "40%",
    verticalAlign: "baseline",
    border: "2px solid rgb(147, 118, 0)",
    "&:hover": {
      background: "#ccc",
    },
  },
  checkBoxStyle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sortStyle: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(3),
    "&:hover": {
      cursor: "pointer",
    },
  },
  parageraphStyle: {
    fontSize: "25px",
  },
  sortContainer: {
    borderRadius: "50px",
    marginTop: "auto",
    marginBottom: "auto",
    background: "rgb(147, 118, 0)",
    color: "rgb(232,232,166)",
    padding: theme.spacing(4),
    textAlign: "right",
  },
  saveStyle: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(3),
    "&:hover": {
      cursor: "pointer",
    },
  },
  save: {
    marginTop: "auto",
    marginBottom: "auto",
    background: "rgb(147, 118, 0)",
    color: "rgb(232,232,166)",
    padding: theme.spacing(4),
  },
  saveIcone: {
    marginLeft: theme.spacing(3),
    transform: "rotate(-90deg)",
  },
  parageraphSaveStyle: {
    fontSize: "25px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  saveContainer: {
    borderRadius: "50px",
  },
}));
const Sort = () => {
  const dispatch = useDispatch();
  const sorts = useSelector((state) => state.userSort);
  const navigate = useNavigate();
  const classes = useStyles();
  const items = useRef([]);
  const sortItem = useSelector((state) => state.sortState);
  const selected = useSelector(state => state.checkBoxState)
  const firstItem = {
    id: "-1",
    name: "هیچکدام",
    is_selected: false,
  };
  useEffect(() => {
    dispatch(
      fetchSortsFilterController(
        341393410,
        selected.gradeFilter.items.length === 0
          ? -1
          : selected.majorFilter.items.join("."),
        selected.majorFilter.items.length === 0
          ? -1
          : selected.majorFilter.items.join("."),
        selected.pubFilter.items.length === 0
          ? -1
          : selected.pubFilter.items.join("."),
        sortItem.empty || sortItem.item === "-1" ? 1 : sortItem.item
      )
    );
  }, []);
  const { sort_options } = sorts?.result;
  const sortItems = [firstItem].concat(sort_options);

  useEffect(() => {
    items.current =
      sortItems.length > 0 && sortItems?.map((el) => el?.is_selected);
  }, [sorts]);
  const changeHandler = useCallback(
    (pos, e, name) => {
      const element = { val: e.target.value, name };
      const updatedCheckBox =
        items.current.length > 0 &&
        items.current.map((el, index) => (pos === index ? !el : false));
      updatedCheckBox.length > 0 &&
        updatedCheckBox.forEach((el, index) => {
          if (pos === index) {
            el && dispatch(addItemSort(element));
          }
        });
      items.current = [...updatedCheckBox];
    },
    [dispatch]
  );
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.headerContainer} xs={12} container>
        <Grid item xs={6} className={classes.headerStyle}>
          <Typography variant="h4">Books</Typography>
        </Grid>
        <Grid item xs={6} className={classes.headerStyle}>
          <NavigationIcon className={classes.iconStyle} />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.sortStyle}>
        <Card
          className={classes.sortContainer}
          onClick={() => navigate("/books", { replace: true })}
        >
          <Typography variant="body2" className={classes.parageraphStyle}>
            sort according to :
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} container className={classes.checkBoxContainer}>
        {sort_options &&
          sortItems.map((el, index) => (
            <Grid item xs={12} className={classes.ckeckBoxItem} key={el.id}>
              <label className={classes.checkBoxLabelContainer}>
                {el.name}
                <input
                  type="radio"
                  defaultChecked={items.current[index]}
                  checked={sortItem.item.val === el.id}
                  className={classes.inputCheckBox}
                  onChange={(e) => changeHandler(index, e, el.name)}
                  value={el.id}
                />
                <div className={classes.checkmark}></div>
              </label>
            </Grid>
          ))}
      </Grid>
      <Grid item xs={12} className={classes.saveStyle}>
        <Card
          className={classes.saveContainer}
          onClick={() => navigate("/books", { replace: true })}
        >
          <Grid className={classes.save} container>
            <NavigationIcon className={classes.saveIcone} />

            <Typography variant="body2" className={classes.parageraphSaveStyle}>
              save and back
            </Typography>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Sort;
