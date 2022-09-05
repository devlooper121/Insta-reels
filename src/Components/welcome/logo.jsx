import logo from "../../image/logo.svg"

import styles from "./logo.module.css"

const Logo = (props) => {
    return <div className={styles.logoCont} >
        <img className={styles.logo} src={logo} alt="" />
        <p>welcome to Insta reels</p>
    </div>
}

export default Logo
