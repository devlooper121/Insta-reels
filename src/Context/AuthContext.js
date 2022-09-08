import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { findUserByUID } from "../Components/functions/util";

import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext();

// jo bhi isme pass hoga / wrap hoga wo props.children me milega
export function AuthContextProvider(props) {
    const [cUser, setCUser] = useState(null);
    const [error, setError] = useState(null);
    const [mainLoder, setMainLoder] = useState(true);
    const [onlineStatus, setOnlineStatus] = useState(null);

    useEffect(() => {
        window.addEventListener("offline", () => {
            setOnlineStatus(false);
        });
        window.addEventListener("online", () => {
            setOnlineStatus(true);
        });

        return () => {
            window.removeEventListener("offline", () => {
                setOnlineStatus(false);
            });
            window.removeEventListener("online", () => {
                setOnlineStatus(true);
            });
        };
    }, []);
    // getting user auth
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCUser({ uid: user.uid });
                (async () => {
                    try {
                        // console.log(props.uid);
                        const userDetails = await findUserByUID(user.uid);
                        setCUser({ user: userDetails, uid: user.uid })
                        // console.log(user);
                    } catch (err) {
                        setError(err)
                    }
                    setMainLoder(false);
                })()
            } else {
                setCUser(null);
            }

        })
    }, [])


    return (
        <AuthContext.Provider value={{ cUser, error, mainLoder, onlineStatus}}>
            {mainLoder === false && props.children // show children only if mainloder is false
            }
        </AuthContext.Provider>
    )
}