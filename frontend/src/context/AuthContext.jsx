//importing necessary hooks
import { createContext,useContext,useEffect, useState } from "react";

//creating authcontext object
export const Authcontext=createContext();

//passing children as prop
export const AuthProvider= ({children})=>{
     
    //stores userlogin data
    const [user,setUser]=useState(null);
   
    //strores token
    const [token,setToken]=useState(localStorage.getItem("token"));

    //logout funtion
    const logout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null)
        setUser(null);
    };

useEffect(()=>{
    const savedUser = localStorage.getItem("user");

    if(savedUser){
        setUser(JSON.parse(savedUser));
    }
},[]);

return (
<Authcontext.Provider 
value={{
    user,
    token,
    setUser,
    setToken,
    logout
}}
> {children}
 </Authcontext.Provider>
);
}