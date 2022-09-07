import styles from "./commentCard.module.css"
import React, {useState, useEffect, useContext} from "react";
import { findUserByUID, timeSince } from "../functions/util";
import { AuthContext } from "../../Context/AuthContext";
import { updateDocByCollection } from "../functions/util";

const CommentCard = (props) => {
    const {cUser} = useContext(AuthContext);
    const { uid, msg, date, likes } = props.data;
    const [user, setUser] = useState(null); // it is commenter (user)
    const profileImgUrl = user ? user.profileImgUrls[0]:"https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp";
    const userName = user ? user.userId : "loding..."
    // getting commenter details by uid in comments
    useEffect(() => {
        if(cUser.uid !== uid){
            (async () => {
                try {
                    // console.log(props.uid);
                    const user = await findUserByUID(uid);
                    setUser(user)
                    // console.log(user);
                } catch (err) {
                    console.log(err.message);
                }
            })()
        }
        else{
            setUser(cUser.user);
        }
    }, [cUser, uid])
    const likeTheCommentHandler = (e) =>{
        e.stopPropagation();
        
        if(!likes.includes(cUser.uid)){
            console.log("like");
            updateDocByCollection("comments", props.id, {
                likes:[...likes, cUser.uid]
            })
        }else{
            console.log("Dis-like");
            updateDocByCollection("comments", props.id, {
                likes:likes.filter(uid=>uid!==cUser.uid)
            })
        }
            
    }
    const likedStyle = likes.includes(cUser.uid) ? `material-symbols-rounded ${styles.liked}`: `material-symbols-rounded ${styles.dis}`
    return (
        <div className={styles["comment-card"]}>
            <img  src={profileImgUrl} alt="commenter" />
            <div className={styles.details}>
                <div className={styles.content}>
                    <p className={styles["user-name"]} ><b>{userName}</b> <span>{msg}</span></p>
                    

                </div>
                <div className={styles["details-other"]}>
                    <span>{timeSince(date)+" ago"}</span>
                    <span>{likes.length} likes</span>
                </div>
            </div>
            <div className={styles.like}>
            <span className={likedStyle} onClick={likeTheCommentHandler}>
                favorite
            </span>
            </div>
        </div>
    )
}

export default CommentCard