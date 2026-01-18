import React, { createContext, useState, useContext, useEffect } from 'react';


const userContext = createContext();

function AuthContext({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Restore user from localStorage on mount/refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user from localStorage:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }   

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    } 
    
  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext);
export default AuthContext