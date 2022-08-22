import loginReducer from "./HomeLogin/reducerHomeLogin";
import booksReducer from "./BooksApi/BooksApiReducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import majorsReducer from "./FilterApi/MajorReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import gradesReducer from "./FilterApi/GradeReducer";
import publishesReducer from "./FilterApi/PublishesReducer";
import sortReducer from "./FilterApi/SortReducer";
import checkBoxFilterController from "./FilterControlData/checkBoxControlReducer";
import sortItemReducer from "./FilterControlData/radioGroupReducer";
import getDetailsReducer from "./ProductApi/getDetailReducer";
import CartReducer from "./CardApi/CardApiReducer";
import CartFinalReducer from "./CardApi/CardApiReducerFinal";
import WalletReducer from "./WalletApi/WalletApiReducer";
const rootReducer = combineReducers({
  userState: loginReducer,
  userBooks: booksReducer,
  userMajors: majorsReducer,
  userGrades: gradesReducer,
  userPublishes: publishesReducer,
  userSort: sortReducer,
  checkBoxState: checkBoxFilterController,
  sortState: sortItemReducer,
  getDetailsState: getDetailsReducer,
  cartState: CartReducer,
  cartFinalState: CartFinalReducer,
  walletState: WalletReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);
export default store;
