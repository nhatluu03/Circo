import { createContext, useState } from "react";
import Cookies from "universal-cookie";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const cookies = new Cookies();

  const [user, setUser] = useState(null);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    cookies.set("accessToken", user.accessToken);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
