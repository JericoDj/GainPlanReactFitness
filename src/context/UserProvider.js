import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import UserController from "../controller/UserController"; 
import { useNavigate } from "react-router-dom";

export default function UserProvider({ children }) {
  
  const [user, setUser] = useState({ id: null, isAdmin: false });
  const [loading, setLoading] = useState(true);

  const unsetUser = () => {
   
    setUser({ id: null, isAdmin: false });
    setLoading(false);
  };

  const login = async (email, password) => {
    const data = await UserController.login(email, password);
    localStorage.setItem("token", data.token);
    setUser({ id: data._id, isAdmin: data.isAdmin });
    return data;
  };

  const register = async (userData) => {
    return await UserController.register(userData);
  };

  const forgotPassword = async (email) => {
    return await UserController.forgotPassword(email);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://fitness-app-api-j7a0.onrender.com/users/details", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?._id) {
          setUser({ id: data.user._id, isAdmin: data.user.isAdmin });
      
        } else {
          unsetUser();
        }
      })
      .catch(() => unsetUser())
      .finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        unsetUser,
        loading,
        login,          
        register,
        forgotPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
