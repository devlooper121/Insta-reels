import React from "react"
import { useState, useContext, useEffect } from "react"
import { NavBar } from "../NavBar/NavBar"
import Button from "../UI/Button"
import Loding from "../UI/loding"

import { AuthContext } from "../../Context/AuthContext"

import styles from "./newPost.module.css"
import ProgressBar from "../UI/ProgressBar"
// util
import { findUserByUID, setData, updateDocByCollection, writeRTD } from "../functions/util"
// // firebase
// import { db } from "../../firebase";
// import { doc, updateDoc } from "firebase/firestore";
// //firebase storage
// import { storage } from "../../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useFileUpload from "../../Hooks/uploadFile-hook"
import DropMessage from "../Bacdrop/dropMessage"
import Logo from "../welcome/logo"


const NewPost = (props) => {
    const {cUser} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loding, setLoding] = useState(true);
    const [videoUrl, setVideoUrl] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    // const [videoFile, setVideoFile] = useState(null);
    // upload percentage
    
    const {
        uploadStatus:uploadPercentage,
        setUploadStatus,
        uploadFileHandler,

    } = useFileUpload();
    
    useEffect(() => {
        (async () => {
            try {
                const user = await findUserByUID(cUser.uid);
                setUser(user)
                setLoding(false)
            } catch (err) {
                console.log(err.message);
                setLoding(false)
            }
        })()
        
    }, [cUser])
    const videoInputHandler = (e) => {

        // console.log(e.target.files);
        const file = e.target.files[0];
        if (file && file.type.includes("video")) {
            setVideoFile(file)
            setVideoUrl(URL.createObjectURL(file))
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
                uid:cUser.uid,
                comments:[],
                likes:[],
                isCommentable:true
            });
            const newdata = await writeRTD("reels",{
                url:url,
                uid:cUser.uid,
                comments:{},
                likes:{},
                isCommentable:true
            })
            console.log(newdata);
            updateDocByCollection("users", cUser.uid,{
                postIds:[videoId, ...user.postIds]
            })
        }
        uploadFileHandler(partRef,{content:videoFile}, getUrl);
    }
    return (
        <React.Fragment>
            {uploadPercentage ?  <ProgressBar value={uploadPercentage}/> : ""}
            <NavBar />
            {loding ? <Loding/>: <div className={styles["uploadArea"]}>
                <div className={styles["videoFrame"]}>
                    <label htmlFor={styles.videoInput} className={styles.btn} ><span className="material-symbols-rounded">
                        {videoUrl ? "cached" : "add"}
                    </span></label>
                    <input id={styles.videoInput} type="file" accept="video/*" onChange={videoInputHandler} />
                    {videoUrl && <video src={videoUrl} className={styles.preview} controls></video>}
                    {videoUrl && <Button onClick={uploadVideoHandler}><span className="material-symbols-rounded">
                        file_upload
                    </span></Button>}
                </div>

            </div>}
            {uploadPercentage===100 && <DropMessage onClick={()=>setUploadStatus(0)} msg={"Video uploaded successfully!"} />}
        </React.Fragment>
    )
}

export default NewPost