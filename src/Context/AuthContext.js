import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { findUserByUID } from "../Components/functions/util";

import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

// jo bhi isme pass hoga / wrap hoga wo props.children me milega
export function AuthContextProvider(props) {
    const [cUser, setCUser] = useState(null);
    const [error, setError] = useState(null);
    const [mainLoder,setMainLoder] = useState(true);
    // getting user auth
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                (async () => {
                    try {
                        // console.log(props.uid);
                        const userDetails = await findUserByUID(user.uid);
                        setCUser({user:userDetails, uid:user.uid})
                        // console.log(user);
                    } catch (err) {
                        setError(err)
                    }
                })()
            }else{
                setCUser(null);
            }
            setMainLoder(false);
        })
    }, [auth])


    return (
        <AuthContext.Provider value={{cUser, error}}>
            {mainLoder === false && props.children // show children only if mainloder is false
            }
        </AuthContext.Provider>
    )
}