import React from "react"
import styles from "./loding.module.css"


const Loding = () => {
    return <React.Fragment>
        <div className={styles.backdrop}></div>
        <div className={styles["loder-box"]}>
            <div className={styles.loder}>
                <div className={styles.circle}></div>
            </div>
            <div className={styles.spike} id={styles["top"]}></div>
            <div className={styles.spike} id={styles["left"]}></div>
            <div className={styles.spike} id={styles["right"]}></div>
            <div className={styles.spike} id={styles["bottom"]}></div>
            <div className={styles.round} id={styles["top1"]}></div>
            <div className={styles.round} id={styles["left1"]}></div>
            <div className={styles.round} id={styles["bottom1"]}></div>
            <div className={styles.round} id={styles["right1"]}></div>

        </div>
        <div className={styles["loding"]}>
            <h1>Loding</h1>
            <div className={styles["spinner"]}></div>
        </div>
    </React.Fragment>
}

export default Loding