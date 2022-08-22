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

export const fetchGetDetailsController = (
  id,
  grade = -1,
  major = -1,
  pub = -1,
  sort = 0,
  bookId
) => {
  return (dispatch) => {
    dispatch(waitingForApi());
    axios
      .get(
        `http://Daryaftyar.ir/store/bookslist/show_book/id:${id}-grade:${grade}-major:${major}-pub:${pub}-sort:${sort}-bid:${bookId}`
      )
      .then((res) => {
        dispatch(fetchRequestSuccessfully(res.data));
      })
      .catch((err) => dispatch(fetchRequestFailure(err)));
  };
};
