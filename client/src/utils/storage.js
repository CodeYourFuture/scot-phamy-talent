export const saveDataToLocalStorage = data =>
  localStorage.setItem("userData", JSON.stringify(data));

export const getItemFromLocalStorage = () =>
  JSON.parse(localStorage.getItem("userData"));

export const removeItemFromLocalStorage = () =>
  localStorage.removeItem("userData");
