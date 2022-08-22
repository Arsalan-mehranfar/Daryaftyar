const initialState = {
  gradeFilter: {
    items: [],
    allSelected: true,
  },
  majorFilter: {
    items: [],
    allSelected: true,
  },
  pubFilter: {
    items: [],
    allSelected: true,
  },
};
const checkBoxFilterController = (state = initialState, action) => {
  const name = action.payload?.name;
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        [name]: {
          items: [...state[action.payload?.name]?.items, action.payload?.item],
          allSelected: false,
        },
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        [name]: {
          items: state[name]?.items.filter((el) => el !== action.payload?.item),
          allSelected: false,
        },
      };
    case "ALL_ITEMS_ARE_SELECTED": {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          allSelected: true,
        },
      };
    }
    case "REMOVE_ALL": {
      return {
        ...state,
        [action.payload]: {
          items: [],
          allSelected: false,
        },
      };
    }
    default:
      return state;
  }
};
export default checkBoxFilterController;
