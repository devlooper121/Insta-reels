import { Link } from "react-router-dom"
import { logOut } from "../functions/util"

import styles from "./Menu.module.css"

export const Menu = () => {
    return (
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

                <div onClick={logOut} className={`${styles["menu-list"]} ${ styles["logout-menu"]}`}>
                    logout
                </div>
            </div>
        </div>
    )
}
