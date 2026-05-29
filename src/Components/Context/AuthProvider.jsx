import React, { createContext, useEffect, useState } from "react";
import { getlocalstorage, setlocalstorage } from "../../Utils/localstorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    employeesData: [],
    adminData: [],
  });

  useEffect(() => {
    setlocalstorage()
    const data = getlocalstorage()
    setUserData(data)
  }, [])

 const refreshData = () => {
    const data = getlocalstorage()
    setUserData(data)
  }

  return (
    <AuthContext.Provider value={{ userData, setUserData, refreshData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider