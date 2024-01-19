import { createContext, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const cookies = new Cookies();

  const [user, setUser] = useState(null);

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    cookies.set("accessToken", user.accessToken);
    setUser(user);
  };

  const logout = async () => {
    const response = await axios.post("http://localhost:3000/users/logout", {}, {withCredentials: true})
    console.log(response)
    cookies.remove("accessToken");
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
