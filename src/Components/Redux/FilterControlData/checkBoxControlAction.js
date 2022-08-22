const addItem = (item, name) => {
  return {
    type: "ADD_ITEM",
    payload: { item, name },
  };
};
const removeItem = (item, name) => {
  return {
    type: "REMOVE_ITEM",
    payload: { item, name },
  };
};
const allSelected = (name) => {
  return {
    type: "ALL_ITEMS_ARE_SELECTED",
    payload: name,
  };
};
const removeAll = (name) => {
  return {
    type: "REMOVE_ALL",
    payload: name,
  };
};
export { addItem, removeItem, allSelected, removeAll };
