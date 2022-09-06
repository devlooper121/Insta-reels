import { useRef } from "react"
import styles from "./comment.module.css"
import CommentCard from "./commentCard"
import { useContext, useState, useEffect } from "react"
import {AuthContext} from "../../Context/AuthContext"
import { updateDocByCollection, findUserByUID, setData } from "../functions/util"


const Comment = (props) => {
    const {cUser} = useContext(AuthContext);
    const user = cUser.user;
    
    // console.log(props.commentArr);
    const postComment = () => {
        console.log(inputRef.current.innerText);
        const msg = inputRef.current.innerText.trim();
        
        if(msg){

            const commentId = setData("comments", {
                uid:cUser.uid, 
                msg, date:Date.now(), 
                likes:[]
            })
            updateDocByCollection("reels", props.id, {
                comments:[ commentId, ...props.commentArr]
            })
        }
            
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
                <img src={user.profileImgUrls[0]} alt="profile" />
                <span ref={inputRef} className={styles.input} contentEditable ></span>
                <button onClick={postComment} type="button">post</button>
            </div>
        </div>
    )
}

export default Comment