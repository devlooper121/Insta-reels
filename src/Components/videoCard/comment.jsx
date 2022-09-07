import { useRef } from "react"
import styles from "./comment.module.css"
import CommentCard from "./commentCard"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { updateDocByCollection, findUserByUID, setData } from "../functions/util"
//firebase
import { db } from "../../firebase"
import { collection, query, where, onSnapshot } from "firebase/firestore";

const Comment = (props) => {
    const { cUser } = useContext(AuthContext);
    const user = cUser.user;
    const [commentArr, setCommentArr] = useState([]);
    useEffect(() => {
        const q = query(collection(db, "comments"), where("vid", "==", props.id));
        onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({id:doc.id, data:doc.data()});
            });
            // console.log("All comments: ", data);
            setCommentArr(data)
        });
    }, [props.id])
    // console.log(props.commentArr);
    const postComment = async () => {
        console.log(inputRef.current.innerText);
        const msg = inputRef.current.innerText.trim();

        if (msg) {

            const commentId = await setData("comments", {
                uid: cUser.uid,
                msg, date: Date.now(),
                likes: [],
                vid: props.id
            })
            updateDocByCollection("reels", props.id, {
                comments: [commentId, ...props.commentArr]
            })
        }

        inputRef.current.innerText = ""
    }
    const inputRef = useRef();
    return (
        <div className={styles.comments}>
            <div className={styles["back-btn"]}><span onClick={props.onBack} className="material-symbols-rounded">
                keyboard_backspace
            </span>Comments</div>
            <div className={styles["comment-box"]}>
                {commentArr.map(comment => {
                    // console.log(comment);
                    return (
                        <CommentCard key={comment.id} data={comment.data} id={comment.id} />
                    )
                })}


            </div>
            <div className={styles.newComment}>
                <img src={user.profileImgUrls[0]} alt="profile" />
                <span ref={inputRef} className={styles.input} contentEditable ></span>
                {/* <button onClick={postComment} type="button">post</button> */}
                <span onClick={postComment} className={`material-symbols-rounded ${styles.button}`}>
                    send
                </span>
            </div>
        </div>
    )
}

export default Comment