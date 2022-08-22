import Header from "./Home/Header";
import Landing from "./Home/Landing";
import { Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fecthDataController } from "./Redux/HomeLogin/actionHomeLogin";
const Home = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userState);
  useEffect(() => {
    dispatch(fecthDataController(341393410));
  }, []);
  return (
    <div>
      {userData.error ? (
        <h4>Something is going wrong</h4>
      ) : userData.loading ? (
        <h3>Loading...</h3>
      ) : (
        <Grid container>
          <Grid item xs={12}>
            <Header {...userData.result} />
          </Grid>
          <Grid item xs={12}>
            <Landing {...userData.result} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Home;
