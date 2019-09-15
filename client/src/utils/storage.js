export const saveLoggedInUserData = data =>
  localStorage.setItem("userData", JSON.stringify(data));

export const getLoggedInUserData = () =>
  JSON.parse(localStorage.getItem("userData"));

export const removeUserDataOnLogout = () => localStorage.removeItem("userData");
