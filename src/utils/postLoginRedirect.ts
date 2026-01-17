export const isLoggedIn = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("accessToken");
};

export const setPostLoginRedirect = (path: string) => {
  sessionStorage.setItem("postLoginRedirect", path);
};

export const getPostLoginRedirect = () => {
  return sessionStorage.getItem("postLoginRedirect") || "/";
};

export const clearPostLoginRedirect = () => {
  sessionStorage.removeItem("postLoginRedirect");
};
