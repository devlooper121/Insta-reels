import { useState } from "react"
import { Link } from "react-router-dom"
import { logOut } from "../functions/util"
import ConfirmButton from "../Bacdrop/ConfirmButton"
import styles from "./Menu.module.css"

export const Menu = () => {
    const [logoutClick, setLogoutClick] = useState(false);
    const logOutHandler = (e) => {
        e.stopPropagation();
        setLogoutClick(true);
    }
    const cancle = (e) => {
        e.stopPropagation();
        setLogoutClick(false);
    }
    return (
        logoutClick ? <ConfirmButton 
        message="Are you sure want to logout!"
        cancelColor="green"
        confirmColor="#a11"
        onCancle={cancle}
        onConfirm={logOut}
        z={11}
    ></ConfirmButton> :
        <div className={styles.menu}>
            <div className={styles["square"]}></div>
            <div className={styles["menu2"]}>
                <Link to="/profile">
                    <div className={styles["menu-list"]}>
                        <span className="material-symbols-rounded">
                            manage_accounts
                        </span>
                        <div className={styles["menu-name"]}>Profile</div>
                    </div>
                </Link>
                
                    <div className={styles["menu-list"]}>
                        <span className="material-symbols-rounded">
                            bookmark
                        </span>
                        <div className={styles["menu-name"]}>Saved</div>
                    </div>
                <Link to="/setting">
                <div className={styles["menu-list"]}>
                    <span className="material-symbols-rounded">
                        settings
                    </span>
                    <div className={styles["menu-name"]}>Settings</div>
                </div>
                </Link>

                <div onClick={logOutHandler} className={`${styles["menu-list"]} ${ styles["logout-menu"]}`}>
                    logout
                </div>
            </div>
        </div>
    )
}
