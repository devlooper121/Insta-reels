import React from "react";
import styles from "./PostItem.module.css"


const PostItem = (props) => {
    const mouseEnterHandler = (e) => {
        e.target.play();
    }
    const mouseLeaveHandler = (e) => {
        e.target.currentTime = 0;
        e.target.pause();
    }
    return <video src={props.url} className={styles.item} onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}></video>
    
}

export default PostItem