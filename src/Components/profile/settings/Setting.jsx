import React, { useEffect, useState, useContext } from "react"

import { AuthContext } from "../../../Context/AuthContext"

import { NavBar } from "../../NavBar/NavBar"
import styles from "./Setting.module.css";
import Loding from "../../UI/loding";
import Button from "../../UI/Button";
import Input from "../../UI/Input"
// util import
import { findUserByUID, updateDocByCollection } from "../../functions/util";
import { userNameValidator } from "../../functions/validation"
// custom hook import
import useInput from "../../../Hooks/input-hook"
import useFileUpload from "../../../Hooks/uploadFile-hook";


const ProfileSetting = () => {
    const {cUser} = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [loding, setLoding] = useState(true);
    // profile image input state
    const [profileImg, setProfileImg] = useState(null);

    let profileImgUrl = profileImg === null ?
        user !== null ?
            user.profileImgUrls[0] :
            "" :
        URL.createObjectURL(profileImg);

    const {
        input: entredUID,
        inputHandler: uidChangeHandler,
        inputBlurHandler: uidBlurHandler,
        isValid: isUIDValid,
        isInvalid: isUIDInputInvalid,
        setInput: setUID,
    } = useInput(userNameValidator);
    const {
        input: entredName,
        inputHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        isValid: isNameValid,
        isInvalid: isNameInputInvalid,
        setInput: setName,
    } = useInput((name) => {
        if (name.length === 0)
            return "can not be empty"
        else
            return true
    });

    const {
        isUploading,
        uploadStatus,
        error,
        uploadFileHandler
    } = useFileUpload()
    useEffect(() => {
        (async () => {
            try {
                const user = await findUserByUID(cUser.uid);
                console.log(user);
                setUser(user)
                profileImgUrl = user.profileImgUrls[0];
                setUID(user.userId);
                setName(user.name)
                setLoding(false)
            } catch (err) {
                console.log(err.message);
                setLoding(false)
            }
        })()
    }, [])


    const imageInputHandler = (e) => {
        const file = e.target.files[0];
        if (file.type.includes("image")) {
            setProfileImg(file);
        }
    }
    const submitHandler = async () => {
        // console.log("changed");

        const textData = {
            name: entredName === "" ? user.name : entredName,
            userId: entredUID === "" ? user.userId : entredUID
        }
        // console.log(textData);
        setLoding(true)
        // getting ref of database for updating
        // const docRef = doc(db, "users", cUser.uid);
        // console.log(user)
        if (profileImg) {
            // const compressImage = resizeFile(profileImg);
            const metadata = {
                contentType: 'image/*'
            };
            const getUrl = (url) => {
                const newProfileImgArr = [url, ...user.profileImgUrls]
                updateDocByCollection("users", cUser.uid, {
                    profileImgUrls: newProfileImgArr,
                    ...textData
                })
            }
            const pathRef = `store/image/profileImg/${user.userId}/${Math.random().toString() + profileImg.name}`;
            uploadFileHandler(pathRef, { content: profileImg, metedata: metadata }, getUrl);
        }
        else {
            updateDocByCollection("users", cUser.uid, {
                ...textData
            })
        }
        setLoding(false)

        // // 'file' comes from the Blob or File API
        // await uploadBytes(storage, profileImg);
        // console.log(newProfileImgUrl);

        // console.log(profileImg);
    }
    return (
        <React.Fragment>
            <NavBar />

            {loding ? <Loding /> :
                <div className={styles.settingsPage}>
                    <div className={styles.imgFolder}>
                        <label className={styles.editLabel} htmlFor="inputFile"><span className="material-symbols-rounded">
                            edit
                        </span></label>
                        <input type="file" accept="image/*" onChange={imageInputHandler} className={styles.inputFile} id="inputFile" />
                        <img src={profileImgUrl} alt="profile-preview" />
                    </div>

                    <div className={styles.form}>
                        <Input data={
                            {
                                label: "name",
                                id: "name",
                                onChange: nameChangeHandler,
                                onBlur: nameBlurHandler,
                                value: entredName,
                                type: "text",
                                invalidMsg: isNameValid,
                                isInvalid: isNameInputInvalid
                            }
                        } />
                        <Input data={
                            {
                                label: "username",
                                id: "username",
                                onChange: uidChangeHandler,
                                onBlur: uidBlurHandler,
                                value: entredUID,
                                type: "text",
                                invalidMsg: isUIDValid,
                                isInvalid: isUIDInputInvalid
                            }
                        } />
                        <Button onClick={submitHandler}>Save*</Button>
                    </div>
                </div>}
        </React.Fragment>
    )
}


export default ProfileSetting