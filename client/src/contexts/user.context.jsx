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
  const fetchUser = async (userId) => {
    const response = await axios.get(`http://localhost:3000/users/${userId}`)
    login(response.data)
    setUser(response.data);
  };
  const value = {
    user,
    login,
    logout,
    fetchUser
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
