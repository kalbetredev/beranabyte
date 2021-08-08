import { createContext, useContext, useEffect, useState } from "react";
import * as auth from "../auth";
import User from "../models/User";

const AuthContext = createContext(null);

export interface AuthProvider {
  user: User;
  signIn: (email: any, password: any) => Promise<void>;
  signUp: (userName: any, email: any, password: any) => Promise<User>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: any) => any;
  confirmPasswordReset: (password: any, code: any) => any;
}

export const ProvideAuth = ({ children }) => {
  const auth: AuthProvider = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

function useAuthProvider(): AuthProvider {
  const [user, setUser] = useState<User>(null);

  const signIn = async (email, password) => {
    await auth.signIn(email, password);
    return fetchCurrentUser();
  };

  const signUp = async (userName, email, password) => {
    const response = await auth.registerUser(userName, email, password);
    if (!response) return response;
  };

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  const sendPasswordResetEmail = (email) => {
    return undefined;
  };

  const confirmPasswordReset = (password, code) => {
    return undefined;
  };

  useEffect(() => {
    if (!user) fetchCurrentUser();
  }, []);

  const fetchCurrentUser = () => {
    auth.getCurrentUser().then((user) => {
      setUser(user);
    });
  };

  return {
    user,
    signIn,
    signUp,
    signOut,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

export default useAuth;
