import { useState } from "react";
import logo from "../../image/logo.svg"
import { Menu } from "../Menu/Menu";
import { Link } from "react-router-dom";

import styles from "./navbar.module.css"
import { Backdrop1, BackDrop2 } from "../Bacdrop/backdrop";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import NewPost from "../newPost/newpost";
import ProgressBar from "../UI/ProgressBar";

export const NavBar = () => {
    const {cUser, mainLoder} = useContext(AuthContext);
    const [menuVisible, setMenuVisible] = useState(false);
    const [searching, setSearching] = useState(false);
    const [newPost, setNewPost] = useState(false);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    window.addEventListener('online', () => console.log('Became online'));
window.addEventListener('offline', () => console.log('Became offline'));
    const changeVisibility = () => {
        if (menuVisible) {
            setMenuVisible(false)
        } else {
            setMenuVisible(true)
        }
    }
    const onPercentageChange = (value) => {
        setUploadPercentage(value);
    }
    const cancleNewPost = () => {
        setNewPost(false);
    }

    return (
        
        <div className={styles["header"]}>
            {uploadPercentage ? <ProgressBar value={uploadPercentage}/> : "" }
            { newPost && <BackDrop2 
                onClick={cancleNewPost} 
                z={11}>
                    <NewPost 
                        onCancle={cancleNewPost}
                        onPercentageChange = {onPercentageChange}
                    />
            </BackDrop2> }
            <div className={styles["brand-left"]}>
                <img className={styles["brand-logo"]} src={logo} alt="" />
            </div>
            <div onClick={() => setSearching(true)} className={styles["search-mid"]}>
                <div className={styles["searchBox"]}>
                    {searching === true ? <><input type="text" name="query" className={styles["searchBox"]} placeholder="Search" /> <span onClick={(e) => { setSearching(false); e.stopPropagation() }} className="material-symbols-rounded small">
                        backspace
                    </span> </> :
                        <><span className="material-symbols-rounded low">
                            search
                        </span>
                            Search</>
                    }

                </div>
            </div>
            <div className={styles["nav-right"]}>
                <ul className={styles["navBar"]}>
                    <li className={styles["navLink"]}>
                        <Link to="/feed">
                            <span className="material-symbols-rounded">
                                home
                            </span>
                        </Link>
                    </li>
                    <li className={styles["navLink"]}>
                        <span className="material-symbols-rounded">
                            movie
                        </span>
                    </li>
                    <li className={styles["navLink"]} onClick={()=> setNewPost(newPost=> !newPost)}>
                        
                            <span className="material-symbols-rounded">
                                add_box
                            </span>
                        
                    </li>
                    <li className={styles["navLink"]}>
                        <span className="material-symbols-rounded">
                            favorite
                        </span>
                    </li>
                    <li onClick={changeVisibility} className={`${styles["navLink"]} ${styles["menu-launch"]}`}>
                        {mainLoder ? <span className="material-symbols-rounded">
                            account_circle

                        </span> : <img src={cUser.user.profileImgUrls[0]} className={styles.profileImg} />}
                        {menuVisible !== true ? "" :
                            <>
                                <Backdrop1 onclick={changeVisibility} z={1}/>
                                <Menu></Menu>
                            </>
                        }
                    </li>

                </ul>
            </div>
        </div>
    )
}
