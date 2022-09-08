import { useState, useEffect, useRef } from "react"
import Comment from "./comment"
import YNBtn from "./PlayPauseBtn"

import { findUserByUID, updateDocByCollection } from "../functions/util"

import "./videoCard.css"
import { useContext } from "react"
import { AuthContext } from "../../Context/AuthContext"

// firebase
import { db } from "../../firebase"
import { doc, onSnapshot } from "firebase/firestore";
// inview
import { useInView } from 'react-intersection-observer';

export const VideoCard = (props) => {
    const { ref, inView, entry: videoRef } = useInView({
        /* Optional options */
        threshold: 1,
    });

    const { cUser } = useContext(AuthContext);
    const { mute, setToMute } = props;
    const [commentOn, setCommentOn] = useState(false);
    const [user, setUser] = useState(null); // jiska reels hai wo user

    const [reelData, setReelsData] = useState(props.data)
    // console.log(props.data)
    const profileImgUrl = user ? user.profileImgUrls[0] : "https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp";
    const userName = user ? user.userId : "loding..."


    useEffect(() => {
        onSnapshot(doc(db, "reels", props.id), (doc) => {
            // console.log(doc.data());
            setReelsData(doc.data())
        });
    }, [props.id])

    useEffect(() => {
        (async () => {
            try {
                // console.log(props.uid);
                const user = await findUserByUID(reelData.uid);
                setUser(user)
                // console.log(user);
            } catch (err) {
                console.log(err.message);
            }
        })()
    }, [reelData.uid])

    // console.log(inView, videoRef);
    if (videoRef && !inView) {
        videoRef.target.currentTime = 0;
        videoRef.target.pause()
        
    }
    if (videoRef && inView) {
        videoRef.target.play()
    }
    
    const muteUnmute = () => {
        if (mute) {
            videoRef.target.muted = false
            setToMute(false)
        } else {
            videoRef.target.muted = true
            setToMute(true)
        }
    }
    const likeTheVideoHandler = (e) => {
        e.stopPropagation();

        if (!reelData.likes.includes(cUser.uid)) {
            console.log("like");
            updateDocByCollection("reels", props.id, {
                likes: [...reelData.likes, cUser.uid]
            })
        } else {
            console.log("Dis-like");
            updateDocByCollection("reels", props.id, {
                likes: reelData.likes.filter(uid => uid !== cUser.uid)
            })
        }

    }
    const likedStyle = reelData.likes.includes(cUser.uid) ? `material-symbols-rounded liked` : `material-symbols-rounded dis`
    return (
        <div onClick={() => { console.log("actiom"); return 0 }} className="action">
            <div className="video-info">
                <p className="post-info"><span className="material-symbols-rounded fill">
                    music_note
                </span>{props.title}</p>
                <div className="post-info">
                    <img className="post-profile" src={profileImgUrl} alt="" />
                    <p className="post-name">{userName}</p>
                </div>
            </div>
            <ul className="likeShare">
                <li onClick={likeTheVideoHandler} className="like-list"><span className={likedStyle}>
                    favorite
                </span>{reelData.likes.length}</li>
                <li onClick={() => setCommentOn(true)} className="like-list"><span className="material-symbols-rounded fill">
                    mode_comment
                </span>{reelData.comments.length}</li>
                {/* <li className="like-list"><span className="material-symbols-rounded">
                    send
                </span></li>
                <li className="like-list"><span className="material-symbols-rounded">
                    more_vert
                </span></li> */}
            </ul>
            <YNBtn status={mute} onClick={muteUnmute} />
            <video
                loop
                autoPlay
                className={"video"}
                onClick={(e) => { console.log("video"); setCommentOn(false); return muteUnmute() }}
                src={reelData.url}
                ref={ref}
                muted={mute}
            >
            </video>
            {commentOn &&
                <Comment
                    onBack={() => setCommentOn(false)}
                    commentArr={reelData.comments}
                    permision={reelData.isCommentable}
                    profileImgUrl={profileImgUrl}
                    id={props.id}
                ></Comment>}
        </div>
    )
}

