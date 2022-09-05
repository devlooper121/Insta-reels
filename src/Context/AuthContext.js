import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

// jo bhi isme pass hoga / wrap hoga wo props.children me milega
export function AuthContextProvider(props) {
    const [cUser, setUser] = useState(null);
    const [reelsData, setReelsData] = useState(null);
    const [mainLoder,setMainLoder] = useState(true);
    
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
            setMainLoder(false);
        })
    }, [])
    useEffect(()=>{
        const reelsDataArr = [];
        console.log("hh");
        setMainLoder(true);
        (async () => {
            const querySnapshot = await getDocs(collection(db, "reels"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                reelsDataArr.push({ key: doc.id, value: doc.data() })
            });
            // console.log(reelsDataArr);
            setReelsData(reelsDataArr);
            setMainLoder(false);
        })();
    }, [cUser])

    return (
        <AuthContext.Provider value={{cUser,reelsData}}>
            {mainLoder === false && props.children // show children only if mainloder is false
            }
        </AuthContext.Provider>
    )
}