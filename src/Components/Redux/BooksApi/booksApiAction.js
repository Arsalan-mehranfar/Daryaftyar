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

export const fetchBooksController = (
  id,
  grade = -1,
  major = -1,
  pub = -1,
  sort = 0
) => {
  return (dispatch) => {
    dispatch(waitingForApi());
    axios
      .get(
        `http://Daryaftyar.ir/store/bookslist/id:${id}-grade:${grade}-major:${major}-pub:${pub}-sort:${sort}`
      )
      .then((res) => {
        dispatch(fetchRequestSuccessfully(res.data));
      })
      .catch((err) => dispatch(fetchRequestFailure(err)));
  };
};
