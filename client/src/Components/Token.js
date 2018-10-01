export const setToken = token => {
  const d = new Date();
  d.setTime(d.getTime() + (10*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = `token=${ token }; ` + expires + '; path=/;';
};

export const removeToken = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
