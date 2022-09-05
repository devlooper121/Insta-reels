import { useState, useEffect, useRef } from "react"
import Comment from "./comment"
import YNBtn from "./PlayPauseBtn"

import { findUserByUID, updateDocByCollection } from "../functions/util"

import "./videoCard.css"
import { useContext } from "react"
import {AuthContext} from "../../Context/AuthContext"

export const VideoCard = (props) => {
    const videoRef = useRef();
    const {cUser} = useContext(AuthContext);
    const [playing, setPlay] = useState(false);
    const [videoShrink, setVideoShrink] = useState(false);
    const [user, setUser] = useState(null);
    const profileImgUrl = user ? user.profileImgUrls[0]:"https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp";
    const userName = user ? user.userId : "loding..."
    useEffect(() => {
        (async () => {
            try {
                // console.log(props.uid);
                const user = await findUserByUID(props.uid);
                setUser(user)
                // console.log(user);
            } catch (err) {
                console.log(err.message);
            }
        })()
    }, [])
    const playPause = () => {
        if (playing) {
            videoRef.current.play()
            setPlay(false)
        } else {
            videoRef.current.pause()
            setPlay(true)
        }
    }
    const likeTheVideoHandler = (e) =>{
        e.stopPropagation();
        console.log("like");
        if(!props.likes.includes(cUser.uid))
            updateDocByCollection("reels", props.id, {
                likes:[...props.likes, cUser.uid]
            })
    }
    return (
        <div onClick={() => { console.log("actiom"); return 0 }} className="action">
            <div className="video-info">
                <div className="post-info">
                    <img className="post-profile" src={profileImgUrl} alt="" />
                    <p className="post-name">{userName}</p>
                </div>
                <p className="post-info"><span className="material-symbols-rounded">
                    music_note
                </span>{props.title}</p>
            </div>
            <ul className="likeShare">
                <li onClick={likeTheVideoHandler} className="like-list"><span className="material-symbols-rounded fill">
                    favorite
                </span>{props.likes.length}</li>
                <li onClick={() => setVideoShrink(true)} className="like-list"><span className="material-symbols-rounded fill">
                    mode_comment
                </span>{props.comments.length}</li>
                {/* <li className="like-list"><span className="material-symbols-rounded">
                    send
                </span></li>
                <li className="like-list"><span className="material-symbols-rounded">
                    more_vert
                </span></li> */}
            </ul>
            <YNBtn status={playing} onClick={playPause}/>
            <video 
                loop
                autoPlay
                className={videoShrink ? "shrink video" : "video"} 
                onClick={(e) => { console.log("video");setVideoShrink(false); return playPause() }} 
                src={props.url}
                ref={videoRef}
                >
            </video>
            {videoShrink && 
                <Comment 
                    onBack={()=>setVideoShrink(false)}
                    commentArr={props.comments}
                    profileImgUrl={profileImgUrl}
                    id={props.id}
                ></Comment>}
        </div>
    )
}

