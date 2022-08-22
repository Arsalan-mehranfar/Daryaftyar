import axios from "axios";
const fetchRequestSuccessfully = (data) => {
  return {
    type: "FETCH_REQUEST_SUCCESSFULLY",
    payload: data,
  };
};
const waitingForApi = () => {
  return {
    type: "WAITING_FOR_API",
    payload: "LOADING_ON",
  };
};
const fetchRequestFailure = (err) => {
  return {
    type: "FETCH_REQUEST_FAILURE",
    payload: err,
  };
};

export const fetchCardData = (id) => {
  return (dispatch) => {
    dispatch(waitingForApi());
    axios
      .get(`http://Daryaftyar.ir/store/cart/id:${id}`)
      .then((res) => {
        dispatch(fetchRequestSuccessfully(res.data));
      })
      .catch((err) => dispatch(fetchRequestFailure(err)));
  };
};
