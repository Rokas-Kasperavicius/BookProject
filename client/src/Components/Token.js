export const setToken = () => {
  const d = new Date();
  d.setTime(d.getTime() + (5*60*1000));
  const expires = "expires="+ d.toUTCString();
  document.cookie = 'token=true; ' + expires + '; path=/;';
};

export const removeToken = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
