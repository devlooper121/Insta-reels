import React, { useRef } from "react"
import { useState, useContext} from "react"
import { NavBar } from "../NavBar/NavBar"
import Button from "../UI/Button"

import { AuthContext } from "../../Context/AuthContext"

import styles from "./newPost.module.css"
import ProgressBar from "../UI/ProgressBar"
// util
import {setData, updateDocByCollection } from "../functions/util"

import useFileUpload from "../../Hooks/uploadFile-hook"
import DropMessage from "../Bacdrop/dropMessage"
import { useEffect } from "react"


const NewPost = (props) => {
    const {cUser} = useContext(AuthContext);
    const user = cUser.user;
    const [videoUrl, setVideoUrl] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [aboutVideo, setAboutVideo] = useState("");
    const videoRef = useRef();
    const [play, setPlay] = useState(false);
    // for checkbox
    const [commentOn, setCommentOn] = useState(true);
    // const [videoFile, setVideoFile] = useState(null);
    // upload percentage
    // using custom hook for file upload
    const {
        uploadStatus:uploadPercentage,
        uploadFileHandler,

    } = useFileUpload();

    const videoInputHandler = (e) => {

        // console.log(e.target.files);
        const file = e.target.files[0];
        if (file && file.type.includes("video")) {
            setVideoFile(file)
            setVideoUrl(URL.createObjectURL(file))
            setAboutVideo(file.name)
        } else {
            alert("Only upload video file");
        }
        // console.log(file.type.includes("video"))
    }

    const uploadVideoHandler = () => {
        const partRef = `store/reels/video/${user.userId}/${Math.random().toString() + videoFile.name}`;
        // getting ref of database for updating
        const getUrl = async (url) => {
            
            // console.log(url);
            const videoId = await setData("reels",{
                url,
                title:aboutVideo,
                uid:cUser.uid,
                comments:[],
                likes:[],
                isCommentable:commentOn
            });
            
            updateDocByCollection("users", cUser.uid,{
                postIds:[videoId, ...user.postIds]
            })
        }
        uploadFileHandler(partRef,{content:videoFile}, getUrl);
    }

    const cancleVideo = () => {
        if(uploadPercentage === 0 || uploadPercentage === 100 ){
            if(videoFile){
                setVideoFile(null);
                setVideoUrl("");
                setCommentOn(true)
            }
            else{
                console.log("novideo go back");
                props.onCancle();
            }
        }
        
    }

    const uploadPost = () => {
        if(videoFile){
            uploadVideoHandler();
        }
    }
    const textChangeHandler = (e) => {
        setAboutVideo(e.target.value)
    }
    const playPauseHandler = () => {
        if(play){
            setPlay(play=>!play);
            videoRef.current.pause();
        }else{
            setPlay(play=>!play);
            videoRef.current.play();
        }
    }
    useEffect(()=>{
        props.onPercentageChange(uploadPercentage)
    },[uploadPercentage])
    return (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button name="back-btn" onClick={cancleVideo}>
                        <span className="material-symbols-rounded">
                        keyboard_backspace
                    </span></button>
                    <h1>Create new post</h1>
                    <button 
                        name="back-btn" 
                        disabled={videoFile ? false : uploadPercentage === 0 ? true : false} 
                        onClick={uploadPost} >Post</button>
                </div>
                <div className={styles.uploadArea}>
                    <div className={styles.frame}>
                        {videoUrl ? <video  
                            src={videoUrl} 
                            className={styles.preview} 
                            onClick={playPauseHandler}
                            ref = {videoRef}
                        /> :  <>
                        <label 
                            htmlFor={styles.videoInput} 
                            className={styles.btn}
                            >
                            <span className="material-symbols-rounded">
                                file_upload
                            </span> 
                            Select from device
                        </label>
                        <input 
                            id={styles.videoInput} 
                            type="file" 
                            accept="video/*" 
                            onChange={videoInputHandler} />
                        </>}
                    </div>
                    { videoFile ?  <div className={styles.postInfoEdit}>
                        <div className={styles.userCard}>
                            <img 
                                src={user.profileImgUrls[0]} 
                                alt="profile-img" 
                                className={styles.profileImg}
                            />
                            <p 
                                name="userName" 
                                className={styles.userName} 
                            > {user.userId} </p>
                        </div>
                        {/* <p id={styles.about}></p> */}
                        <textarea 
                            className={styles.aboutPost} 
                            value={aboutVideo} 
                            onChange={textChangeHandler} 
                            placeholder="Write a caption..." 
                        />
                        <div className={styles.commentMode} >
                            <p>Comment {commentOn ? 'on' : 'off'}</p>
                            <Checkbox   
                                id="comment" 
                                value={commentOn} 
                                onClick={()=> setCommentOn(commentOn=> !commentOn)}
                            />
                        </div>
                    </div> : ""}
                </div>
            </div>
        </React.Fragment>
    )
}

export default NewPost


const Checkbox = (props) => {
    return(
        <label htmlFor={props.id} className={styles.checkboxLabel}>
            <input type="checkbox" value={props.value}   id={props.id} />
            <span onClick={props.onClick} className={`${styles.checkBox} ${ props.value ? styles.checked: ""}`} ></span>
        </label>
    )
}