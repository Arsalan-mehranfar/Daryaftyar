const initialState = {
  loading: true,
  result: {},
  error: "",
};
const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST_SUCCESSFULLY":
      return {
        result: action.payload,
        loading: false,
        error: "",
      };
    case "FECTH_REQUEST_FAILURE":
      return {
        result: [],
        loading: false,
        error: action.payload,
      };
    case "WAITING_FOR_API":
      return {
        loading: true,
        result: [],
        error: "",
      };
    default:
      return state;
  }
};
export default booksReducer;
