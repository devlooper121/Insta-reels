import React from "react";
import styles from "./PostItem.module.css"


const PostItem = (props) => {
    return <div className={styles.item}>
        <video src={props.url} className={styles.item} controls></video>
    </div>
}

export default PostItem