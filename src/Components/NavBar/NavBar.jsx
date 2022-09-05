import { useState } from "react";
import logo from "../../image/logo.svg"
import { Menu } from "../Menu/Menu";
import { Link } from "react-router-dom";

import styles from "./navbar.module.css"
import { Backdrop1, BackDrop2 } from "../Bacdrop/backdrop";

export const NavBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [searching, setSearching] = useState(false);
    const changeVisibility = () => {
        if (menuVisible) {
            setMenuVisible(false)
        } else {
            setMenuVisible(true)
        }
    }

    return (
        <div className={styles["header"]}>
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
                    <li className={styles["navLink"]}>
                        <Link to="/new-post">
                            <span className="material-symbols-rounded">
                                add_box
                            </span>
                        </Link>
                    </li>
                    <li className={styles["navLink"]}>
                        <span className="material-symbols-rounded">
                            favorite
                        </span>
                    </li>
                    <li onClick={changeVisibility} className={`${styles["navLink"]} ${styles["menu-launch"]}`}>
                        <span className="material-symbols-rounded">
                            account_circle

                        </span>
                        {menuVisible !== true ? "" :
                            <>
                                <Backdrop1 onclick={changeVisibility} />
                                <Menu></Menu>
                            </>
                        }
                    </li>

                </ul>
            </div>
        </div>
    )
}
