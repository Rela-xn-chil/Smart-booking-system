export const isLoggedIn = () => {
  return !!localStorage.getItem('token');
};

export const getUserId = () => {
  return localStorage.getItem('userId');
};
