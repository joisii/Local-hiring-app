import {
  createContext,
  useEffect,
  useState
} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user,setUser]=useState(()=>{
   const savedUser = localStorage.getItem("user");

   return savedUser
      ? JSON.parse(savedUser)
      : null;
});

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
  };

  useEffect(() => {

    const savedUser =
      localStorage.getItem("user");

    const savedToken =
      localStorage.getItem("token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }

    setLoading(false);

  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        setUser,
        setToken,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};