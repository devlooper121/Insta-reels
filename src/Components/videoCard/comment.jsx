import { useRef } from "react"
import styles from "./comment.module.css"
import CommentCard from "./commentCard"
import { useContext, useState, useEffect } from "react"
import {AuthContext} from "../../Context/AuthContext"
import { updateDocByCollection, findUserByUID, setDataWithID } from "../functions/util"


const Comment = (props) => {
    const {cUser} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const profileImgUrl = user ? user.profileImgUrls[0]:"https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg.webp";
    
    // const userName = user ? user.userId : "loding..."
    useEffect(() => {
        (async () => {
            try {
                // console.log(props.uid);
                const user = await findUserByUID(cUser.uid);
                setUser(user)
                // console.log(user);
            } catch (err) {
                console.log(err.message);
            }
        })()
    }, [])
    // console.log(props.commentArr);
    const postComment = () => {
        console.log(inputRef.current.innerText);
        const msg = inputRef.current.innerText.trim();
        
        if(msg)
            updateDocByCollection("reels", props.id, {
                comments:[ {uid:cUser.uid, msg, date:Date.now(), likes:[]}, ...props.commentArr]
            })
            // setDataWithID("comments", props.id,{
            //     uid:cUser.uid, msg, date:Date.now(), likes:[]
            // })
            updateDocByCollection("comments", props.id, {
                commentsArr:[ {uid:cUser.uid, msg, date:Date.now(), likes:[]}, ...props.commentArr]
            })
        inputRef.current.innerText = ""
    }
    const inputRef = useRef();
    return (
        <div className={styles.comments}>
            <div className={styles["back-btn"]}><span  onClick={props.onBack} className="material-symbols-rounded">
                keyboard_backspace
            </span>Comments</div>
            <div className={styles["comment-box"]}>
                {props.commentArr.map(comment=>{
                    // console.log(comment);
                    return (
                        <CommentCard key={+Math.random()} {...comment} />
                    )
                })}
                
                
            </div>
            <div className={styles.newComment}>
                <img src={profileImgUrl} alt="profile" />
                <span ref={inputRef} className={styles.input} contentEditable ></span>
                <button onClick={postComment} type="button">post</button>
            </div>
        </div>
    )
}

export default Comment