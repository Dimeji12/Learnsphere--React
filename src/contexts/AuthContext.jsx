
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast'; // Assuming useToast is available

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast(); // Assuming useToast hook is available

  useEffect(() => {
    // Simulate loading user from localStorage on initial load
    setLoading(true);
    const storedUser = localStorage.getItem('dashboardCurrentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const existingUsers = JSON.parse(localStorage.getItem('dashboardUsers')) || [];
        if (existingUsers.find(user => user.email === email)) {
          const errorMsg = "An account with this email already exists.";
          toast({ variant: "destructive", title: "Signup Failed", description: errorMsg });
          setLoading(false);
          reject(new Error(errorMsg));
          return;
        }
        const newUser = { id: Date.now().toString(), email, password, name, joined: new Date().toISOString() }; // Store password hashed in real app
        existingUsers.push(newUser);
        localStorage.setItem('dashboardUsers', JSON.stringify(existingUsers));
        localStorage.setItem('dashboardCurrentUser', JSON.stringify(newUser));
        setCurrentUser(newUser);
        toast({ title: "Signup Successful!", description: `Welcome, ${name}!` });
        setLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const existingUsers = JSON.parse(localStorage.getItem('dashboardUsers')) || [];
        const user = existingUsers.find(u => u.email === email && u.password === password); // Compare hashed password in real app
        if (user) {
          localStorage.setItem('dashboardCurrentUser', JSON.stringify(user));
          setCurrentUser(user);
          toast({ title: "Login Successful!", description: `Welcome back, ${user.name}!` });
          setLoading(false);
          resolve(user);
        } else {
          const errorMsg = "Invalid email or password.";
          toast({ variant: "destructive", title: "Login Failed", description: errorMsg });
          setLoading(false);
          reject(new Error(errorMsg));
        }
      }, 1000);
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        localStorage.removeItem('dashboardCurrentUser');
        setCurrentUser(null);
        toast({ title: "Logged Out", description: "You have been successfully logged out." });
        setLoading(false);
        resolve();
      }, 500);
    });
  };
  
  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
