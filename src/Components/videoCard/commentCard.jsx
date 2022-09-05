import styles from "./commentCard.module.css"
import React, {useState, useEffect} from "react";
import { findUserByUID, timeSince } from "../functions/util";

const CommentCard = (props) => {
    const { uid, msg, date, likes } = props;
    const [user, setUser] = useState(null);
    const profileImgUrl = user ? user.profileImgUrls[0]:"https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp";
    const userName = user ? user.userId : "loding..."
    useEffect(() => {
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
    }, [])
    return (
        <div className={styles["comment-card"]}>
            <img  src={profileImgUrl} alt="commenter" />
            <div className={styles.details}>
                <div className={styles.content}>
                    <p className={styles["user-name"]} ><b>{userName}</b> <span>{msg}</span></p>
                    

                </div>
                <div className={styles["details-other"]}>
                    <span>{timeSince(date)+" ago"}</span>
                    <span>{likes.length}</span>
                </div>
            </div>
            <div className={styles.like}>
            <span className={`material-symbols-rounded ${styles.liked}`}>
                favorite
            </span>
            </div>
        </div>
    )
}

export default CommentCard