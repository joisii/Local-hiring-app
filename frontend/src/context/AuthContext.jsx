import {
  createContext,
  useEffect,
  useState
} from "react";

import API from "../services/api";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children
}) => {

  /* ---------------- USER ---------------- */

  const [user, setUser] =
    useState(null);

  /* ---------------- ACCESS TOKEN ---------------- */

  const [accessToken,
    setAccessToken] =
    useState(null);

  /* ---------------- LOADING ---------------- */

  const [loading,
    setLoading] =
    useState(true);

  /* ---------------- LOGOUT ---------------- */

  const logout = () => {

    localStorage.removeItem(
      "accessToken"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    setAccessToken(null);
  };

  /* ---------------- INITIAL AUTH CHECK ---------------- */

  useEffect(() => {

    const initializeAuth =
      async () => {

        try {

          const savedUser =
            localStorage.getItem(
              "user"
            );

          if (!savedUser) {

            setLoading(false);

            return;
          }

          // try refreshing token automatically
          const res =
            await API.post(
              "/auth/refresh-token"
            );

          const newAccessToken =
            res.data.data.accessToken;

          localStorage.setItem(
            "accessToken",
            newAccessToken
          );

          setAccessToken(
            newAccessToken
          );

          setUser(
            JSON.parse(savedUser)
          );

        } catch (err) {

          console.log(
            "Initial refresh failed",
            err
          );

          logout();

        } finally {

          setLoading(false);
        }
      };

    initializeAuth();

  }, []);

  return (

    <AuthContext.Provider
      value={{

        user,

        accessToken,

        loading,

        setUser,

        setAccessToken,

        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  );
};