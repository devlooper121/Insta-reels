import "./profile.css"
import React, { useContext, useEffect, useState } from "react"

// Context import from AuthContext.js for logged user info and main loder
import { AuthContext } from "../../Context/AuthContext"

import { NavBar } from "../NavBar/NavBar";
import PostItem from "./PostItem";
import Loding from "../UI/loding";
import {getMultipleDocsByCollectionAndField} from "../functions/util"

function Profile() {
    const { cUser, reelsData} = useContext(AuthContext);
    const user = cUser.user;
    const[loding, setLoding] = useState(true);
    // const [reelData, setReelData] = useState([]);
    const reelData = reelsData.filter(reel=>{
        return reel.data.uid === cUser.uid
    })
    useEffect(()=>{
        if(user){
            setLoding(false);
        }else{
            setLoding(true)
        }
    },[user])
    // useEffect(()=>{
    //     (async()=>{
    //         try{
    //             const data = await getMultipleDocsByCollectionAndField("reels", "uid", cUser.uid);
    //             setReelData(data);
    //         }catch(err){
    //             console.log(err.message);
    //         }
    //     })()
    // },[])
    return (
        <>  
            <NavBar></NavBar>
            {<div className="profile-box">
                <div className="profile-container">
                    <div className="pimg-container">
                        <div className="img-box">
                            <img className="pimg" src={user.profileImgUrls[0] || "https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp"} alt="Profile" />
                        </div>
                    </div>
                    <div className="details">
                        <div className="content id setting">{user.userId}</div>
                        <div className="content post-array">No of post : <b className="bold">{user.postIds.length}</b></div>
                        <div className="content name">{user.name}</div>
                        <div className="contact email">{user.email}</div>
                    </div>
                </div>
                <div className="user-post-list">
                    <ul className="post-nav">
                        <li className="post-nav-btn"><span className="material-symbols-rounded small">
                            grid_on
                        </span>POSTS</li>
                        <li className="post-nav-btn"><span className="material-symbols-rounded small">
                            bookmark
                        </span>SAVED</li>
                    </ul>
                </div>
                <div className="my-posts">
                    {reelData.map(reel => {
                        return (<PostItem
                            key={reel.id}
                            id={reel.key}
                            url={reel.data.url}
                        />)
                    })}
                </div>
            </div>}
        </>
    )
}

export default Profile