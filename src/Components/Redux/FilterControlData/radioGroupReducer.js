const initialState = {
  item: {},
  empty: true,
};
const sortItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM_SORT":
      if (action.payload === "-1") {
        return {
          item: {},
          empty: true,
        };
      } else {
        return {
          item: action.payload,
          empty: false,
        };
      }
    default:
      return { ...state };
  }
};
export default sortItemReducer;
