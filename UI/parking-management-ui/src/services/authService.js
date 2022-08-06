import httpService from "./httpService.js";
import jwtDecode from "jwt-decode";
const tokenKey = "token";
export const login = async (userCredentials) => {
  const { data: jwt } = await httpService.post("/User/login", {
    ...userCredentials,
  });
  localStorage.setItem(tokenKey, jwt);
  httpService.setJwt(jwt);
};

export const logout = () => {
  localStorage.removeItem(tokenKey);
};
export const loginInWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
};

httpService.setJwt(getJwt());
export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);

    return {
      role: user[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ],
    };
  } catch (error) {
    return null;
  }
};

export default {
  login,
  logout,
  loginInWithJwt,
  getCurrentUser,
  getJwt,
};
