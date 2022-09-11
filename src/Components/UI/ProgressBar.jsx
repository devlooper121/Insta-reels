import { useRef } from "react"
import styles from "./ProgressBar.module.css"


const ProgressBar = (props) => {
    
    let currWidth = `${props.value%100}%`

    return (
        <div className={styles.progressBarCont}>
            <div className={styles.bar} style={{width:currWidth}}><p className="run"></p></div>
        </div>
    )
}

export default ProgressBar