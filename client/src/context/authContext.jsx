import { createContext, useEffect, useState } from "react";

const AuthContext = createContext()


export const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState(null)

    useEffect(()=>{
        console.log(JSON.parse(localStorage.getItem("user-currency")))
        setAuth(JSON.parse(localStorage.getItem("user-currency")))
    },[])

    return(
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext